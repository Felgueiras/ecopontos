import React from 'react'
import { connect } from "react-redux";
import TableRenderer from '../../components/Table'

import { getQuizzesInfo, getCheckinsInfo, getUserActivityInfo, getElectricityInfo } from './components/IndividualHabit'
import Impact from './components/Impact';

import Joyride from "react-joyride";
import { walkthroughStyle } from '../../../../utils/walkthrough-helper'

const mapStateToProps = state => {
  return {
    wallet: state.wallet,
    transactions: state.wallet.transactions,
    authorizations: state.authorizations
  };
};



class Panel extends React.Component {
  getData = () => {
    const transactions = this.props.transactions;
    let activities = [];
    activities.push(getQuizzesInfo(transactions));
    activities.push(getCheckinsInfo(transactions));
    activities.push(getElectricityInfo(transactions));
    if (this.props.authorizations.includes('gfit')) {
      if (this.props.wallet) {
        activities.push(getUserActivityInfo(transactions, 'walking'));
        activities.push(getUserActivityInfo(transactions, 'biking'));
      }
    }
    return activities;
  }

  getColumns = () => {
    const columns = [
      {
        name: 'Última\nsemana',
        key: 'tokensRecent'
      },
      {
        name: 'Últimos\nresultados',
        key: 'lastResults'
      },
      {
        name: 'Pontos\ntotais',
        key: 'tokensTotal'
      }];
    return columns;
  }


  render() {
    const run = this.props.run;
    const steps = this.props.steps;

    return (
      <React.Fragment>
        <Joyride
          locale={{ back: 'Voltar atrás', close: 'Fechar', last: 'Terminar', next: 'Próximo', skip: 'Ignorar' }}
          continuous
          scrollToFirstStep
          showProgress
          showSkipButton
          run={run}
          steps={steps}
          callback={this.handleJoyrideCallback}
          styles={walkthroughStyle}
        />
        <div className="margin-normal impact_image">
          <Impact static/>
        </div>
        <div className="panel_table">
          <TableRenderer
            data={this.getData()}
            columns={this.getColumns()}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(Panel);
