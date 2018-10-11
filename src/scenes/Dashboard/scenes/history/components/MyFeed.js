import React from 'react'
import { connect } from "react-redux";
import { Radio, Divider, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import FeedElementInfo from './FeedElementInfo';



const walletInfo = {
  address: 'school1-wallet',
  identity: {
    userProfile: {
      guid: "user-guid://school-1"
    }
  },
  created: 1530527996328,
  balance: 100,
  // transactions: transactions,
  status: 'active',
  counters: {
    'user-activity': 2000,
    elearning: 1,
    checkin: 1,
    'energy-saving': 0
  }
}


const filters = [
  {
    name: 'Todos',
    key: 'all'
  },
  {
    name: 'Quizzes',
    key: 'elearning'
  },
  {
    name: 'Check-ins',
    key: 'checkin'
  },
  {
    name: 'Atividade',
    key: 'user-activity'
  },
  {
    name: 'Bónus',
    key: 'bonus'
  }];





import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import dates from '../../../../utils/dates';
import DateUtils from '../../../../../utils/DateUtils';
import EventsForDate from './EventsForDate';
import HistoryUtils from './HistoryUtils';



// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const events = [
  {
    start: new Date(),
    end: new Date(moment().add(1, "days")),
    title: "Some title"
  }
]

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

let CalendarExample = ({ localizer }) => (
  <BigCalendar
    events={events}
    views={allViews}
    step={60}
    showMultiDayTimes
    max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
    defaultDate={new Date(2015, 3, 1)}
    localizer={localizer}
    onSelectEvent={event => alert(event.title)}
  // onSelectSlot={this.handleSelect}
  />
)


class MyFeed extends React.Component {

  state = {
    filter: {
      name: 'Todos',
      key: 'all'
    }
  }

  handleChange = event => {
    this.setState({ filter: event.target.value });
  };


  render() {
    const { filter } = this.state;
    let filtering = false;
    let { transactions } = this.props;


    let byday = {};
    function groupday(value, index, array) {
      byday[value.date] = byday[value.date] || [];
      byday[value.date].push(value);
    }

    if (filter.name !== 'Todos') {
      transactions = transactions.filter(transaction => transaction.source === filter.key);
      filtering = true;
    }
    transactions.map(groupday);
    transactions.sort(DateUtils.sortByDate);
    transactions = transactions.filter(transaction => HistoryUtils.filterInvalid(transaction));


    // VERSION 1 - group by day
    // let listItems = [];
    // for (var property in byday) {
    //   if (byday.hasOwnProperty(property)) {
    //     listItems.push(<li key={"history_transaction_" + property}>
    //       <div className="margin-top-normal">
    //         <EventsForDate
    //           date={property}
    //           filtering={filtering}
    //           personal
    //           transactions={byday[property]} />
    //           <Divider/>
    //       </div>
    //     </li>)
    //   }
    // }



    // VERSION 2 - do not group
    const listItems = transactions.map((transaction, index) => <li key={"history_transaction_" + index}>
      <div className="margin-top-normal">
        <FeedElementInfo
          personal
          filtering={filtering}
          // personal
          transaction={transaction} />
        {/* last one doesn't have divider */}
        {/* {index !== (transactions.length - 1) && */}
        <Divider />
        {/* } */}
      </div>
    </li>);

    return (
      <React.Fragment>
        {/* <CalendarExample /> */}
        <FormControl>
          <Select
            value={this.state.filter}
            onChange={this.handleChange}
          >
            {filters.map((filter, index) =>
              <MenuItem value={filter}>{filter.name}</MenuItem>
            )}

          </Select>
        </FormControl>

        <ul className="margin-bottom">{listItems}</ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    publicWallets: state.publicWallets,
    cause: state.cause,
    transactions: state.wallet.transactions,
  };
};

export default connect(mapStateToProps)(MyFeed)
