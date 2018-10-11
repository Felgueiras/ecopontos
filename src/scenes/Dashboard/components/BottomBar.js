import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setNotifications } from '../../../redux/actions/index'

// mui
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';


// icons 
import learningIcon from '../../../img/icones/24x24px/navegacao/aprender.svg';
import challengeIcon from '../../../img/icones/24x24px/navegacao/desafio.svg';
import shopsIcon from '../../../img/icones/24x24px/navegacao/lojas.svg';
import bonusIcon from '../../../img/icones/24x24px/menu (hamburger)/bonus.svg';
import panelIcon from '../../../img/icones/24x24px/navegacao/painel.svg';
import shopsIconDialog from '../../../img/ilustracoes/onboarding/onboarding_3.svg'

// icons - selected
import learningIconSelected from '../../../img/icones/24x24px/navegacao/selected/aprender.svg';
import challengeIconSelected from '../../../img/icones/24x24px/navegacao/selected/desafio.svg';
import shopsIconSelected from '../../../img/icones/24x24px/navegacao/selected/lojas.svg';
import bonusIconSelected from '../../../img/icones/24x24px/menu (hamburger)/selected/bonus.svg';
import panelIconSelected from '../../../img/icones/24x24px/navegacao/selected/painel.svg';


import LocationPermissionDialog from './LocationPermissionDialog'


const badgeSize = 15;

const styles = {
  root: {
    display: 'block',
  },
  badge: {
    color: 'white',
  },
  colorPrimary: {
    backgroundColor: 'red',
    width: badgeSize,
    height: badgeSize,
    marginTop: 6,
    marginRight: 5
  }
};
const mapStateToProps = state => {
  return {
    quizzes: state.quizzes,
    wallet: state.wallet,
    permissions: state.permissions,
    transactions: state.wallet.transactions,
    network: state.network,
    newQuizzes: state.newQuizzes,
    notifications: {
      newBonuses: state.newBonuses
    }
  };
};

class BottomBar extends Component {
  constructor(props) {
    super(props);


    this.state = {
      value: 0
    };
  }

  handleChange = (event, value) => {
    if (this.props.history.location.pathname.includes('/learning/quiz/')) {
      this.props.openConfirmation();
      return;
    }
    this.setState({ value: value });

    if (value === 3 || value === 4) {

      if (!this.props.permissions.includes('location')) {
        this.setState({
          openFeedback: true,
          dialogButtonText: 'Ir para o quiz'
        });
        this.valueGPS = value;
        return;
      }
    }

    switch (value) {
      case 0:
        this.props.history.replace("/dashboard/panel");
        break;
      case 1:
        this.props.history.replace("/dashboard/challenge");
        break;
      case 2:
        this.props.history.replace("/dashboard/learning");
        break;
      case 3:
        {

          this.props.history.replace("/dashboard/bonus");
          // reset bonus notifications
          let update = this.props.notifications;
          update.newBonuses = 0;
          this.props.setNotifications(update);
          break;
        }
      case 4:
        this.props.history.replace("/dashboard/shops");
        break;
      default:
        break;
    }
  };

  close = (next = false) => {
    this.setState({ openFeedback: false });
    if (next) {
      this.handleChange(null, this.valueGPS);
    }
  };


  render() {

    const { value } = this.state;
    const { classes, newQuizzes } = this.props;
    const { newBonuses } = this.props.notifications;


    // const disableMap = this.props.network === false;    

    const notifications = [{
      value: newQuizzes,
      index: 2
    }, {
      value: newBonuses,
      index: 3
    }];
    notifications.forEach(notification => {
      if (notification.value > 0) {
        notification.element = (<Badge badgeContent={notification.value}
          color="primary"
          classes={{ badge: classes.badge, colorPrimary: classes.colorPrimary, root: classes.root }} >
          <img src={getIcon(notification.index, value)} alt='' className="icon-bottom-bar" />
        </Badge>);
      }
      else {
        notification.element = (
          <img src={getIcon(notification.index, value)} alt='' className="icon-bottom-bar" />
        );
      }
    });

    const quizzesNotification = notifications[0].element;
    const bonusNotification = notifications[1].element;


    function getIcon(index, selectedIndex) {
      const notSelected = [panelIcon, challengeIcon, learningIcon, bonusIcon, shopsIcon];
      const selected = [panelIconSelected, challengeIconSelected, learningIconSelected, bonusIconSelected, shopsIconSelected];
      if (index === selectedIndex) {
        return selected[index];
      }
      else {
        return notSelected[index];
      }
    }


    return (
      <React.Fragment>

        <div className="bottom-bar">

          <BottomNavigation
            showLabels
            value={value}
            onChange={this.handleChange}
            className="bg-bottom-bar"
          >
            <BottomNavigationAction

              label="resumo"
              icon={
                <img src={getIcon(0, value)} alt='' className="icon-bottom-bar" />
              }
            />
            <BottomNavigationAction
              label="escolas"
              className="bottom_challenge"
              icon={
                <img src={getIcon(1, value)} alt='' className="icon-bottom-bar" />
              }
            />
            <BottomNavigationAction
              label="aprender"
              className="bottom_learning"
              icon={quizzesNotification}
            />
            <BottomNavigationAction
              label="bónus"
              className="bottom_bonus"
              icon={bonusNotification}
            />
            <BottomNavigationAction
              className="bottom_shops"
              label="lojas"
              icon={
                <img src={getIcon(4, value)} alt='' className="icon-bottom-bar" />
              } />
          </BottomNavigation>
        </div>
        <LocationPermissionDialog
          close={this.close}
          open={this.state.openFeedback}
          image={shopsIconDialog} />
      </React.Fragment>

    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    setNotifications: notifications => dispatch(setNotifications(notifications))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BottomBar)));
