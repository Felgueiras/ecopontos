import React, { Component } from "react";
// material UI
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Table from "../../../components/Table";

// images

import timeIcon from "../../../../../img/icones/24x24px/desafio/tempo_restante.svg";

import CauseAPI from "../../../../../services/api/CauseAPI";
import { getQuizzesInfo, getCheckinsInfo, getUserActivityInfo, getElectricityInfo } from './IndividualHabit'


import '../../../../../css/panel.css'
import SchoolView from "./SchoolView";


var causes = CauseAPI.fetchCauses();


const styles = theme => ({
  root: {
    overflowX: 'auto',
    border: '2px solid #dddddd',
    margin: 'auto',
    width: '95%',
    marginTop: 10
  },
  selectedIcon: {
    width: 10,
    height: 10
  },
  rootSelected: {
    width: 20,
    height: 20
  },
  colorPrimary: {
    // backgroundColor: 'black',
    marginTop: 10,
    marginRight: 7,
    width: 20,
    height: 20
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  expansionPanelSummary: {
    paddingLeft: 5
  }
});

class ChallengeOverview extends Component {

  constructor(props) {
    super(props);

    // sept. 15
    const challengeEndDate = new Date(2018, 9, 15);
    // check how many remaining days
    var currentDate = new Date();
    var timeDiff = Math.abs(currentDate.getTime() - challengeEndDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    this.state = {
      selectedIndex: this.props.pageIndex,
      challengeDays: diffDays,
      expanded: null
    };
  }

  select = index => {
    this.setState({ selectedIndex: index });
    this.props.callbackFromParent(index);
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  getData = (school) => {
    // get wallet by id
    const wallet = this.props.publicWallets.filter(publicWallet => publicWallet.identity.userProfile.guid === school.id)[0];
    const transactions = wallet.transactions;
    let activities = [];

    activities.push(getQuizzesInfo(transactions, wallet));
    activities.push(getCheckinsInfo(transactions, wallet));
    activities.push(getElectricityInfo(transactions));
    activities.push(getUserActivityInfo(transactions, 'walking'));
    activities.push(getUserActivityInfo(transactions, 'biking'));
    return activities;
  }

  getColumns = () => {
    const columns = [
      {
        name: 'Pontos\nacumulados',
        key: 'tokensTotal'
      },
      {
        name: 'Últimos\nresultados',
        key: 'lastResults'
      }];
    return columns;
  }

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    const wallets = this.props.publicWallets;

    // sum tokens for each one
    var challengePoints = 0;
    for (var i = 0; i < wallets.length; i++) {
      challengePoints += wallets[i].balance;
    }

    wallets.sort(function (a, b) {
      if (a.balance < b.balance) return 1;
      if (a.balance > b.balance) return -1;
      return 0;
    });
    let sortedCauses = [];
    for (let index = 0; index < wallets.length; index++) {
      const element = wallets[index];
      const correspondingCause = causes.filter(cause => cause.address === element.address)[0];
      sortedCauses.push(correspondingCause);
    }

    const schools = sortedCauses.map((cause, index) => (
      <React.Fragment key={"cause_" + index}>
        <ExpansionPanel
          expanded={expanded === 'panel' + index}
          onChange={this.handleChange('panel' + index)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            classes={{ root: classes.expansionPanelSummary, content: classes.expansionPanelSummary }} >
            <SchoolView
              cause={cause}
              wallet={wallets[index]}
              selectedCause={cause.name === this.props.cause.name}
              classes={this.props.classes}
              challengePoints={challengePoints} />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Table
              data={this.getData(cause)}
              columns={this.getColumns()}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment >
    ));

    return (
      <React.Fragment>
        <div className="text-center">
          <img src={timeIcon} alt='' className="icon-small inline-block" />
          <p className="inline-block" >restam <strong>   {this.state.challengeDays} dias</strong>
          </p>
        </div>
        <div className={classes.root}>{schools}</div>
      </React.Fragment >
    );
  }
}

const mapStateToProps = state => {
  return {
    cause: state.cause,
    publicWallets: state.publicWallets
  };
};

export default connect(mapStateToProps, null)(withStyles(styles)(withRouter(ChallengeOverview)));
