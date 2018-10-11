import React, { Component } from 'react';

// MUI

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Snackbar from '@material-ui/core/Snackbar';


// redux
import { connect } from "react-redux";

import SocialIcons from '../components/SocialIcons'


import { HashRouter, withRouter } from 'react-router-dom'
import { FormControl, InputLabel, Input } from '@material-ui/core';
import { setCode } from '../../../redux/actions';




class SignUp extends Component {

  state = {
    code: this.props.code
  }

  showTermsConditions = () => {
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
    window.checked = !this.state.checked;
  }

  handleClose = () => {
    this.setState({ snack: false });
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      username: '',
      password: '',
      loginscreen: [],
      loginmessage: '',
      isLogin: true,
      checked: window.checked ? window.checked : false,
      passwordField: 'password',
      idp: null,
      code: props.code


    }

  }

  validateAndProceed = () => {

    if (!this.state.checked) {
      this.setState({
        snack: true,
        snackMessage: 'Tem de aceitar os termos e condições'
      });
      return;
    }

    if (!window.loggedIn && this.props.login === null) {
      this.setState({
        snack: true,
        snackMessage: 'Tem de se registar primeiro antes de continuar'
      });
      return;
    }

    this.props.setCode(this.state.code);
    this.props.handleNext();
  }

  getBackgroundColor = (idp) => {
    const selectedIDP = this.state.idp;
    if (!!selectedIDP && idp !== selectedIDP) {
      return '#eeeeee'
    }
    // user not logged in
    switch (idp) {
      case "facebook.com":
        return '#3b5999';
      case "google.com":
        return '#dd4b39';
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

  handleChange = event => {
    const code = event.target.value;
    this.setState({ code: code });
  };
  

  render() {
    return (
      <React.Fragment>
        <HashRouter>
          <div className="loginscreen">
            <div className="text-center">
              <p className="text-h2">Registe-se com um login social</p>
              {/* social buttons */}
              <SocialIcons />
              <FormControl className="full-width">
                <InputLabel htmlFor="agent-code">Quem recomendou (nome ou email)</InputLabel>
                <Input id="agent-code" value={this.state.code} onChange={this.handleChange} />
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={this.state.checked}
                    onChange={this.updateCheck}
                  />
                }
                label={
                  <p>
                    Li e <span
                      className="background-primary"
                      onClick={this.showTermsConditions}
                    >aceito</span> os termos de utilização.
                  </p>
                }
              // onClick={this.showThermsConditions}
              />
              <Snackbar
                open={this.state.snack}
                message={this.state.snackMessage}
                autoHideDuration={4000}
                onClose={this.handleClose}
              />
              <div className="text-center to-bottom" >
                <Button
                  variant="raised"
                  color="primary"
                  onClick={this.validateAndProceed}
                  fullWidth={true}
                >
                  Passo seguinte
                </Button>
              </div>
              {/*  
              <Dialog
                title="Esqueceu-se da sua palavra-passe?"
                actions={actions}
                open={this.state.open}
                onRequestClose={this.handleClose}>
                <p>Não se preocupe, nós ajudamos. Insira o seu email de registo.</p>
                <TextField label="Email" floatingLabelText="Email" />
                {/* <RaisedButton variant="raised" component="span">
                    Upload
        <RaisedButton> */}
              {/* <RaisedButton variant="raised"
                    className={styles.btn}
                    label={"Enviar email"}
                    primary={true}
                    onClick={this
                      .sendEmail
                      .bind(this)} /> 
              </Dialog>
              */}
            </div>
          </div>
        </HashRouter>
      </React.Fragment>
    );

  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCode: code => dispatch(setCode(code))
  };
};

const mapStateToProps = state => {
  return {
    login: state.login,
    code: state.code,
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
