import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';

import { connect } from "react-redux";
import { setWalkthrough } from "../../../redux/actions/index";

// walkthrough
import Joyride from "react-joyride";
import { walkthroughStyle, stepsDrawer } from '../../../utils/walkthrough-helper'
import shopsIconDialog from '../../../img/ilustracoes/onboarding/onboarding_3.svg'

import { withRouter } from 'react-router-dom'

// mui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { withStyles } from '@material-ui/core/styles';


// icons - not selected
import map from '../../../img/icones/24x24px/navegacao/mapa.svg';
import forum from '../../../img/icones/24x24px/menu (hamburger)/forum.svg';
import history from '../../../img/icones/24x24px/menu (hamburger)/historico.svg';
import help from '../../../img/icones/24x24px/menu (hamburger)/ajuda.svg';
import exit from '../../../img/icones/24x24px/menu (hamburger)/sair.svg';
import about from '../../../img/icones/48x48px/ajuda/acerca.svg'
import settings from '../../../img/icones/24x24px/menu (hamburger)/definicoes.svg';
import feedback from '../../../img/icones/48x48px/ajuda/fale_connosco.svg';

// icons -  selected
import mapSelected from '../../../img/icones/24x24px/navegacao/selected/mapa.svg';
import forumSelected from '../../../img/icones/24x24px/menu (hamburger)/selected/forum.svg';
import helpSelected from '../../../img/icones/24x24px/menu (hamburger)/selected/ajuda.svg';
import historySelected from '../../../img/icones/24x24px/menu (hamburger)/selected/historico.svg';
import settingsSelected from '../../../img/icones/24x24px/menu (hamburger)/selected/definicoes.svg';
import exitSelected from '../../../img/icones/24x24px/menu (hamburger)/selected/sair.svg';
import LocationPermissionDialog from './LocationPermissionDialog';

import { mainColor } from '../../../constants/theme';

const listItemHeight = 50;

const styles = {
  textSelected: { color: 'white' },
  selected: { backgroundColor: mainColor, height: listItemHeight },
  unselected: { height: listItemHeight },
  userIconStyle: {
    margin: 5,
    marginBottom: 20
  },
  label: {
    color: 'white !important',
  },
}




class NavigationDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1
    };
    this.menuEntries = [
      {
        name: "Mapa",
        location: "/dashboard/map/all",
        unselected: map,
        selected: mapSelected
      },
      {
        name: "Fórum",
        location: "/dashboard/forum",
        unselected: forum,
        selected: forumSelected
      },
      {
        name: "Ajuda",
        location: "/dashboard/help",
        unselected: help,
        selected: helpSelected
      },
      {
        name: "Histórico",
        location: "/dashboard/history",
        unselected: history,
        selected: historySelected
      },
      {
        name: "Sobre",
        location: "/dashboard/help/about",
        // TODO: icons
        unselected: about,
        selected: about
      },
      {
        name: "Definições",
        location: "/dashboard/settings",
        unselected: settings,
        selected: settingsSelected
      },
      {
        name: "Sair",
        location: "",
        unselected: exit,
        selected: exitSelected
      }];


    if (this.props.code) {
      this.menuEntries.splice(1, 0, {
        name: "Fale connsco",
        location: "/dashboard/help/feedback/agent",
        unselected: feedback,
        selected: feedback
      });
    }

  }


  close = (next = false) => {
    this.setState({ openFeedback: false });
    if (next)
      this.handleDrawerSelection(0);
  };


  handleDrawerSelection = (index) => {
    if (index === 0) {

      if (!this.props.permissions.includes('location')) {
        this.setState({
          openFeedback: true,
          dialogButtonText: 'Ir para o quiz'
        });
        this.valueGPS = index;
        return;
      }
    }
    this.props.history.push(this.menuEntries[index].location);


    switch (index) {
      case this.menuEntries.length - 1:
        this.props.logOut();
        break;
      default:
    }
    // close drawer
    this.setState({ selectedIndex: index });
    this.props.close();
  };


  showProfile = () => {
    this.props.history.push("/dashboard/profile");

    // close drawer
    this.props.close();
  };

  getStyle = (index) => {
    if (this.state.selectedIndex === index) {
      return styles.selected;
    }
    return styles.unselected;
  }

  getTextStyle = (index) => {
    if (this.state.selectedIndex === index) {
      return {
        primary: this.props.classes.label,
      };
    }
    return {};
  }

  testRef() {
    alert('getAlert from Child');
  }

  getIcon = (index) => {

    if (this.state.selectedIndex === index) {
      return this.menuEntries[index].selected;
    }
    return this.menuEntries[index].unselected;
  }

  handleJoyrideCallback = (state) => {

    if (state.step) {
      if (state.step.target === ".profile_avatar") {
        // this.toggleDrawer();
      }
    }

    if (state.action === "close") {
      this.props.setWalkthrough(false);
      this.forceUpdate();
    }

    if (state.status === "finished" || state.status === "skip") {
      this.props.setWalkthrough(false);
    }

  }

  render() {

    const { walkthrough: run} = this.props;

    const listItems = [];
    for (let index = 0; index < this.menuEntries.length; index++) {

      let classNameText = "";
      if (this.menuEntries[index].name === "Contas Externas")
        classNameText = "walkthrough_accounts"


      listItems.push(
        <React.Fragment>
          < ListItem button
            onClick={() => this.handleDrawerSelection(index)}
            style={this.getStyle(index)}
            key={"drawer_action_" + index} >
            <ListItemIcon>
              <img className="icon-24" src={this.getIcon(index)} alt='' />
            </ListItemIcon>
            <ListItemText
              className={classNameText}
              primary={this.menuEntries[index].name}
              classes={this.getTextStyle(index)} />
          </ListItem >
          <Divider />
        </React.Fragment>
      );
    }

    const login = this.props.login;
    const email = login.split("/")[3];


    return (
      <SwipeableDrawer
        open={this.props.open}
        onClose={this.props.close}
        onOpen={this.props.openDrawer}
      >
        <Joyride
          locale={{ back: 'Voltar atrás', close: 'Fechar', last: 'Terminar', next: 'Próximo', skip: 'Ignorar' }}
          continuous
          scrollToFirstStep
          showProgress
          showSkipButton
          run={run}
          steps={stepsDrawer}
          callback={this.handleJoyrideCallback}
          styles={walkthroughStyle}
        />
        {/* user info */}
        <Card onClick={this.showProfile}
          className="bg-user"
          raised={false}
          elevation={0}
          square={true}
        >
          <CardContent>
            <Avatar src={this.props.identity ? this.props.identity.picture : ''}
              className="avatar-big margin-all profile_avatar"
            />
            <Typography component="p">
              {email}
            </Typography>
          </CardContent>
        </Card>
        {/* drawer items */}
        <List component="nav" disablePadding={true}>
          {listItems}
        </List>
        <LocationPermissionDialog
          close={this.close}
          open={this.state.openFeedback}
          image={shopsIconDialog} />
      </SwipeableDrawer>
    );
  }
}

const mapStateToProps = state => {
  return {
    walkthrough: state.walkthrough,
    bonus: state.bonus,
    login: state.login,
    identity: state.identity,
    permissions: state.permissions,
    code: state.code
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWalkthrough: walkthrough => dispatch(setWalkthrough(walkthrough))
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(withStyles(styles)(withRouter(NavigationDrawer)));
