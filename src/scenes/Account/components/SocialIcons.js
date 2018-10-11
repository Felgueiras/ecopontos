import React, { Component } from 'react';
// redux
import { setLogin, setShops, setQuizzes, setBonus } from "../../../redux/actions/index";
import { connect } from "react-redux";

// MUI
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

// runtime helper
import { startLocationReporter, startElearningPlayer } from '../../Dashboard/runtimeHelper'

import { HashRouter, withRouter } from 'react-router-dom'

const mapStateToProps = state => {
  return { login: state.login };
};

const mapDispatchToProps = dispatch => {
  return {
    setLogin: login => dispatch(setLogin(login)),
    setShops: shops => dispatch(setShops(shops)),
    setQuizzes: quizzes => dispatch(setQuizzes(quizzes)),
    setBonus: bonus => dispatch(setBonus(bonus)),

  };
};



class ConnectedSignup extends Component {

  constructor(props) {
    super(props);

    // check login
    let stateLogin = this.props.login;
    if (stateLogin) {
      if (stateLogin.includes('google')) {
        stateLogin = 'google.com';
      }
      if (stateLogin.includes('facebook')) {
        stateLogin = 'facebook.com';
      }
    }
    if (this.props.isLogin) {
      stateLogin = null;
    }
    this.state = {
      idp: stateLogin
    }
  }


  showThermsConditions = () => {
    this.props.history.push('/setup/terms');
  }

  updateCheck = () => {

    if (this.state.passwordField === 'password') {
      this.setState({
        passwordField: 'text'
      });
    }
    else {
      this.setState({
        passwordField: 'password'
      });
    }
    this.setState({
      checked: !this.state.checked
    });


  }

  login = (idp) => {
    let _this = this;

    console.log('logging with ', idp);
    window
      .runtime
      .login(idp)
      .then((result) => {
        console.log('result: ', result);
        _this.props.setLogin(result.value);
        _this.setState({ idp: idp });
        if (_this.props.afterLogin) {
          _this.props.afterLogin();
        }
        window.loggedIn = true;


        runtime.requireProtostub("sharing-cities-dsm");

        // load hyperties - shops + bonus + quizzes
        startElearningPlayer(_this.props.setQuizzes);
        startLocationReporter(_this.props.setShops, _this.props.setBonus);
      });
  }

  handleClose = () => {
    this.setState({ open: false });
    console.log('closing');
  };



  getBackgroundColor = (idp) => {
    const selectedIDP = this.state.idp;
    if (!!selectedIDP && idp !== selectedIDP) {
      return this.classes.disabled;
    }
    // user not logged in
    switch (idp) {
      case "facebook.com":
        return this.classes.facebook;
      case "google.com":
        return this.classes.google;
      default:
        break;
    }
  }

  getLabel = (label, idp) => {
    const selectedIDP = this.state.idp;
    if (!!selectedIDP && idp === selectedIDP) {
      switch (idp) {
        case "facebook.com":
          return "Registado com Facebook";
        case "google.com":
          return "Registado com Google";
        default:
          break;
      }

    }
    return label;
  }


  checkDisable = (idp) => {
    const selectedIDP = this.state.idp;
    if (!!selectedIDP && idp !== selectedIDP) {
      return 'icon-disabled';
    }
    return '';

  }

  render() {

    const classes = this.props.classes;
    this.classes = classes;

    let action = "Registar";
    if (this.props.isLogin === true) {
      action = "Entrar";
    }

    var propsCommon = {};
    propsCommon.className = styles.button;
    propsCommon.variant = "raised";
    propsCommon.color = "primary"
    propsCommon.fullWidth = true;

    return (
      <React.Fragment>
        <HashRouter>
          <div className="loginscreen">
            <div className="text-center">
              {/* 
              <Button
                onClick={() => this.login("facebook.com")}
                classes={{ raisedPrimary: this.getBackgroundColor("facebook.com") }}
                {...propsCommon}
              >
                <Icon className={"fab fa-facebook-f fa-2x social-icon " + this.checkDisable("facebook.com")}></Icon>
                {this.getLabel(action + " com Facebook", "facebook.com")}
              </Button>
             */}
              <Button
                onClick={() => this.login("google.com")}
                classes={{ raisedPrimary: this.getBackgroundColor("google.com") }}
                {...propsCommon}
              >
                <Icon className={"fab fa-google fa-2x social-icon " + this.checkDisable("google.com")} ></Icon>
                {this.getLabel(action + " com Google", "google.com")}
              </Button>
            </div>
          </div>
        </HashRouter>
      </React.Fragment>
    );
  }
}

const styles = {
  facebook: {
    backgroundColor: '#3b5999 !important',
    marginBottom: '10px'
  },
  google: {
    backgroundColor: '#dd4b39  !important',
    marginBottom: '10px'
  },
  disabled: {
    backgroundColor: '#eeeeee  !important',
    marginBottom: '10px'
  }
};

const Signup = connect(mapStateToProps, mapDispatchToProps)(ConnectedSignup);
export default withStyles(styles)(withRouter(Signup));
