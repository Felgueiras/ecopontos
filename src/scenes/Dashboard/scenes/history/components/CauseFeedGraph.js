import React from 'react'
import { connect } from "react-redux";
import CauseAPI from '../../../../../services/api/CauseAPI';
import { ResponsiveContainer, LineChart,Brush, Line, XAxis, Legend, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Switch } from '@material-ui/core';
import { cause1Color, cause2Color, cause3Color } from '../../../../../constants/theme';
import HistoryUtils from './HistoryUtils';
import DateUtils from '../../../../../utils/DateUtils';

class CauseFeedGraph extends React.Component {

  generateGraphData = (multiple = false) => (info) => {
    let data = [];
    if (!multiple) {
      const { pointsByDate, daysNames } = info;
      for (let index = 0; index < pointsByDate.length; index++) {
        const points = pointsByDate[index];
        data.push({
          name: DateUtils.formatDate(daysNames[index]),
          pontos: points
        })
      }
    }
    else {
      let differentDatesAux = HistoryUtils.getDifferentDates(info);
      const differentDates = HistoryUtils.getDatesInRange(new Date(differentDatesAux[0]),
        new Date(differentDatesAux[differentDatesAux.length - 1]));

      function getPointsCause(date, data) {
        const { daysNames, pointsByDate } = data;
        const index = daysNames.indexOf(date);
        if (index !== -1) {
          return pointsByDate[index];
        } else {
          // get date closes previous date
          const closestDate = HistoryUtils.findClosestDate(date, daysNames);
          return pointsByDate[daysNames.indexOf(closestDate)];
        }
      }

      for (let index = 0; index < differentDates.length; index++) {
        const date = differentDates[index];
        // get points for that date, by cause
        data.push({
          name: DateUtils.formatDate(date),
          pontos1: getPointsCause(date, info[0]),
          pontos2: getPointsCause(date, info[1]),
          pontos3: getPointsCause(date, info[2]),
        })

      }
    }

    return data;
  }

  getCausesInfo = (wallet) => {

    const transactions = wallet.transactions;
    transactions.sort(function (a, b) {
      if (a.date < b.date) return -1;
      if (a.date > b.term) return 1;
      return 0;
    });

    const transactionsByDate = HistoryUtils.getTransactionsByDate(transactions);

    const daysNames = [];
    for (let index = 0; index < transactionsByDate.length; index++) {
      const day = transactionsByDate[index][0].date;
      daysNames.push(day);
    }

    const pointsByDate = HistoryUtils.getPointsByDate(transactionsByDate)

    return { pointsByDate, daysNames };

  }


  render() {
    const causes = CauseAPI.fetchCauses();
    const { publicWallets } = this.props;

    let causesInfo = [];

    publicWallets.forEach(wallet => {
      causesInfo.push(this.getCausesInfo(wallet));
    });

    const option = 'all'; // 'all'

    let listItems = [];

    switch (option) {
      case 'single':
        causes.forEach(cause => {
          const index = causes.indexOf(cause);
          const data = this.generateGraphData()(causesInfo[index]);

          listItems.push(
            <React.Fragment>
              <p className="text-center">{cause.name}</p>
              <ResponsiveContainer height={300} >
                <LineChart width={600} height={300} data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Line type="monotone" dataKey="pontos" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </React.Fragment>
          );
        });
        break;
      case 'all':
        {
          const data = this.generateGraphData(true)(causesInfo);

          listItems.push(
            <React.Fragment>
              <p className="text-center">Progresso</p>
              <ResponsiveContainer height={300} >
                <LineChart width={600} height={300} data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line dot={false} type="monotone" dataKey="pontos1" stroke={cause1Color} />
                  <Line dot={false} type="monotone" dataKey="pontos2" stroke={cause2Color} />
                  <Line dot={false} type="monotone" dataKey="pontos3" stroke={cause3Color} />
                  <Brush dataKey='name' height={30} stroke="#8884d8" />

                </LineChart>
              </ResponsiveContainer>
            </React.Fragment>
          );
          break;
        }
      default:
        break;
    }


    return (
      <React.Fragment>
        {/* <Switch
          checked={this.state.location}
          onChange={this.handleChange()}
          value="checkedB"
          color="primary"
        /> */}
        {listItems}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    publicWallets: state.publicWallets,
    cause: state.cause,
  };
};

export default connect(mapStateToProps)(CauseFeedGraph)
