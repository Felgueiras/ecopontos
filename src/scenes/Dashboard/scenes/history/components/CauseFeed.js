import React from "react";
import { connect } from "react-redux";
import CauseAPI from "../../../../../services/api/CauseAPI";
import EventsForDate from "./EventsForDate";
import { Divider } from "@material-ui/core";
import HistoryUtils from "./HistoryUtils";

import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from "react-virtualized";
import { setStateKey } from "../../../../../redux/actions";

class CauseFeed extends React.Component {
  constructor(props) {
    super(props);

    const { history } = props;

    this.renderRow = this.renderRow.bind(this);
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100
    });

    this.filtering = false;

    // if (history) {
    //   const { differentDates, transactionsByDate} = history;
    //   this.list = differentDates;
    //   this.transactionsByDate = transactionsByDate;
    //   // TODO: update history
    //   // check new dates
    //   // check new transactions for the same date
    //   // last date
    //   console.log(differentDates);
      
    //   return;
    // }
    const causes = CauseAPI.fetchCauses();
    const { publicWallets: publicWalletsOriginal } = this.props;
    // copy wallets to avoid changing the original
    const publicWallets = JSON.parse(JSON.stringify(publicWalletsOriginal));

    let transactionsByDate = {};
    const differentDates = [];

    function buildDatesObject(transaction) {
      const date = new Date(transaction.date);
      date.setHours(0, 0, 0, 0);
      const time = date.getTime();
      transactionsByDate[time] = transactionsByDate[time] || [];
      transactionsByDate[time].push(transaction);
      if (!differentDates.includes(time)) {
        differentDates.push(time);
      }
    }

    // set cause for each transaction
    for (let index = 0; index < publicWallets.length; index++) {
      const cause = causes[index];
      const publicWallet = publicWallets[index];
      publicWallet.transactions.forEach(transaction => {
        // filter + associate cause to transaction
        if (HistoryUtils.filterInvalid(transaction)) {
          transaction.cause = cause;
          buildDatesObject(transaction);
        }
      });
    }

    // transactions.forEach((transaction, index) => {
    //   const aux = <li key={"history_transaction_" + index}>
    //     <CauseFeedElement
    //       selectedCause={transaction.cause.name === this.props.cause.name}
    //       cause={transaction.cause}
    //       transaction={transaction}
    //     ></CauseFeedElement>
    //   </li>;
    //   listItems.push(aux);
    // });

    const sortByDate = (a, b) => {
      return new Date(b) - new Date(a);
    };
    differentDates.sort(sortByDate);
    this.list = differentDates;
    this.transactionsByDate = transactionsByDate;

    // TODO: store History in redux
    // this.props.setStateKey({
    //   key: "history",
    //   payload: {
    //     differentDates: differentDates,
    //     transactionsByDate: transactionsByDate
    //   }
    // });
  }

  renderRow({ index, key, style, parent }) {
    const time = String(this.list[index]);
    const date = new Date(Number(time));

    return (
      <CellMeasurer
        key={key}
        cache={this.cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div key={key} style={style} className="row">
          <div className="margin-top-normal" style={{ width: "100%" }}>
            <EventsForDate
              date={date}
              filtering={false}
              cause
              transactions={this.transactionsByDate[time]}
            />
            {index < this.list.length - 1 && <Divider />}
          </div>
        </div>
      </CellMeasurer>
    );
  }

  render() {
    return (
      <div className="list" style={{ height: "100vh" }}>
        <AutoSizer>
          {({ width, height }) => {
            return (
              <List
                width={width}
                height={height}
                deferredMeasurementCache={this.cache}
                rowHeight={this.cache.rowHeight}
                rowRenderer={this.renderRow}
                rowCount={this.list.length}
              />
            );
          }}
        </AutoSizer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    publicWallets: state.publicWallets,
    cause: state.cause,
    history: state.history
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStateKey: payload => dispatch(setStateKey(payload))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CauseFeed);
