import React from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { performLogout } from '../../redux/actions/index'

// material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';


// icons
import pointsIcon from '../../img/icones/32x32px/perfil/pontos.svg';
import savingsIcon from '../../img/icones/32x32px/perfil/poupanca.svg';
import googleIcon from '../../img/logo_google.png';

import { withOfflineBehaviourSingleElement } from '../../utils/HoCs'
import ConfirmationDialog from "../Dashboard/components/ConfirmationDialog";
import { StringUtils } from "../../utils/StringUtils";


class Profile extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false,
      snack: false,
      waitingResult: false
    }
  }

  updateCheck() {

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


  openDialog = () => {
    this.setState({ open: true });
  };

  openDialogDeleteAccount = () => {
    if (this.props.checkNetwork())
      this.setState({ delete: true });
  };

  validateAndChangePassword = () => {

    // close dialog
    this.setState({ open: false });
    // show snackbar
    this.setState({ snack: true });

  };


  deleteAccount = (next = false) => {
    let _this = this;
    this.setState({ open: false, delete: false });

    if (next === false) {
      return;
    }
    // this.setState({ waitingResult: true });
    runtime.reset().then((result) => {
      console.log('result: ', result);
      if (result !== true) {
        return;
      }
      // persistor.purge();
      _this.props.history.replace("/reset");

    });

  };

  closeSnack = () => {
    this.setState({ snack: false });
  };


  render() {
    const name = this.props.identity.name;
    const login = this.props.login;
    const { waitingResult } = this.state;
    const email = login.split("/")[3];

    const cause = this.props.cause;
    // TODO - get cause energy saving
    const causeName = cause.name;

    const publicWallet = this.props.publicWallets.filter(publicWallet => publicWallet.identity.userProfile.guid === cause.id)[0];



    // const sharingAccount = true;

    return (
      <div className="text-center margin-top" >
        <Avatar src={this.props.identity.picture}
          className="avatar-big text-center" />
        <p className="text-h2">{name}</p>
        <div>
          <img src={googleIcon} alt='' className="inline-block icon-small" />
          <p className="inline-block">
            {email}
          </p>
          {/* 
          <p className="inline-block">
            Usar outro login social
          </p>
           */}
        </div>
        <hr />
        <p className="text-h2">Causa apoiada</p>
        <p className="text-smaller inline-block">{causeName}</p>

        <div className="row">
          <div className="col-4">
            <img src={savingsIcon} alt='' className="icon-normal inline-block" />
            <p className="text-smaller inline-block">
              <span className="text-h2">--</span><br /> poupança
            </p>

          </div>
          <div className="col-4">
            <Avatar src={cause.thumbnail} className="avatar-big text-center" />
          </div>
          <div className="col-4">
            <img src={pointsIcon} alt='' className="icon-normal inline-block" />
            <p className="text-smaller inline-block">
              <span className="text-h2">{publicWallet.balance}</span>
              <br /> pontos
            </p>
          </div>
        </div>
        <div className="to-bottom margin-bottom" >
          <Button
            variant="raised"
            color="primary"
            onClick={this.openDialogDeleteAccount}
            fullWidth={true}
          >
            Apagar dados
          </Button>
        </div>
        <ConfirmationDialog
          main={'Tem a certeza que pretende apagar os seus dados?'}
          message={'Esta ação é irreversível.'}
          open={this.state.delete}
          close={this.deleteAccount}
          positiveAction={StringUtils.appReset}
          negativeAction={'Cancelar'}
        />
        <Snackbar
          open={this.state.snack}
          message='Password mudada com sucesso'
          autoHideDuration={2000}
          onRequestClose={this.closeSnack}
        />

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    cause: state.cause,
    identity: state.identity,
    publicWallets: state.publicWallets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    performLogout: article => dispatch(performLogout(article)),
  };
};


export default withRouter(withOfflineBehaviourSingleElement(connect(mapStateToProps, mapDispatchToProps)(Profile)));
