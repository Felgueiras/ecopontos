import React from "react";
import { connect } from "react-redux";
import { authorize } from "../../../redux/actions/index";

import { withRouter } from "react-router-dom";

// material ui components
import ExternalAccount from "../components/ExternalAccount";

import { withOfflineBehaviourSingleElement } from '../../../utils/HoCs'


// APIs
import ExternalAccountsAPI, { giraAccount, logo_gira, logoGira } from "../../../services/api/ExternalAccountsAPI";
import { startUserActivity, loadDeviceManager, unregisterEndpointFromDeviceManager, stopUserActivity } from '../../Dashboard/runtimeHelper'

// logos
import logo_gfit from '../../../img/contas_externas/google_fit.png';
import logo_edp from '../../../img/contas_externas/edp.png';
import { Snackbar } from "../../../../node_modules/@material-ui/core";
import FeedbackDialog from "../../Dashboard/components/FeedbackDialog";
import ConfirmationDialog from "../../Dashboard/components/ConfirmationDialog";


class ExternalAccountsSetup extends React.Component {
  state = {
    open: false,
    snack: false,
    dialog: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  gFitAuthorization = () => {
    return new Promise((resolve, reject) => {
      let _this = this;
      runtime.authorise('google.com', 'user_activity_context').then(function (value) {
        _this.props.authorize('gfit', true);
        window.userActivityEnabled = true;
        startUserActivity();
        // close dialog
        _this.handleClose();
        // open snackbar
        _this.setState({
          snack: true,
          snackMessage: 'Autorizou com sucesso o Google Fit',
        });
        resolve(true);
      }).catch(function (err) {
      });
    })
  }

  unauthorizeGFit = () => {
    return new Promise((resolve, reject) => {
      stopUserActivity();
      this.props.authorize('gfit', false);
      this.handleClose();
      // open snackbar
      this.setState({
        snack: true,
        snackMessage: 'Desativou o Google Fit',
      });
      resolve(true);
    })
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRequestCloseDialog = () => {
    this.props.close();
  };


  loginEDP = () => {
    let _this = this;
    const guid = this.props.identity.guid.split('user-guid://')[1];
    return new Promise((resolve, reject) => {
      runtime.authorise('edpdistribuicao.pt', guid).then(function (value) {
        _this.props.authorize('edp', true);
        _this.handleClose();
        _this.setState({
          snack: true,
          snackMessage: 'Autorizou com sucesso o EDP-Distribuição',
        });
        resolve(true);
        // TODO: catch reject
      }).catch(function (err) {

      });
    });
  }

  loginGira = () => {
    this.props.authorize('gira', true);
    this.handleClose();
    // check gfit permissions
    let feedbackDialogContent, feedbackMain, buttonLabel, image, dialog = false, confirmationDialog = false;
    if (this.props.authorizations.includes('gfit')) {
      feedbackMain = 'GIRA ativado';
      buttonLabel = 'Entendido!';
      feedbackDialogContent = `A partir de agora já pode começar
      a ganhar pontos com as
      bicicletas GIRA.`;
      image = logoGira;
      dialog = true;
    }
    else {
      feedbackMain = 'Autorização Google Fit';
      buttonLabel = 'Ok';
      feedbackDialogContent = 'Para ganhar pontos com as bicicletas GIRA verifique se tem o Google Fit instalado e autorize.';
      image = logo_gfit;
      dialog = true;
    }
    this.setState({
      snackMessage: 'Autorizou com sucesso a GIRA',
      feedbackMain: feedbackMain,
      feedbackMessage: feedbackDialogContent,
      buttonLabel: buttonLabel,
      dialog: dialog,
      confirmationDialog: confirmationDialog,
      image: image
    });
  }

  unauthorizeGira = () => {
    this.props.authorize('gira', false);
  }

  unauthorizeEDP = () => {

    let _this = this;


    return new Promise((resolve, reject) => {
      // TODO - wait for get stream(s) / unregister confirmation
      // const unregistered = unregisterEndpointFromDeviceManager(true);
      // if (unregistered) {
      resolve(true);
      _this.props.authorize('edp', false);
      // }
    });
  }

  render() {
    const ExternalAccountOffline = withOfflineBehaviourSingleElement(ExternalAccount);

    var externalAccounts = ExternalAccountsAPI.fetchExternalAccounts();
    const listItems = externalAccounts.map((account, index) => (
      <li key={"external_account_" + index}>
        <ExternalAccountOffline
          account={account}
          onClick={this.handleOpen.bind(this)}
          showButtons={true}
          registered={this.props.authorizations.includes(account.code)}
        />
      </li>
    ));

    const edpAccount = {
      name: 'EDP Distribuição',
      description: `Melhore a sua eficiência energética em casa e ao poupar energia ganha pontos!
 
Ao associar a sua conta da EDP Distribuição poderá participar no jogo com as suas poupanças mensais de eletricidade (kWh). Essas poupanças serão convertidas em pontos que serão usados adicionados aos pontos da escola que apoia.`,
      thumbnail: logo_edp
    };

    const gfitAccount = {
      name: 'Google Fit',
      description: 'Com o <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.fitness" > Google Fit</a> instalado pode usar o telemóvel ou um wearable para monitorizar a distância percorrida a pé ou de bicicleta e assim ganhar mais pontos. Se quiser também pode integrar o Google Fit com as suas < a href="https://play.google.com/store/apps/collection/promotion_3000e6f_googlefit_all" > aplicações favoritas de fitness.</a>',
      thumbnail: logo_gfit
    };

    return (
      <div className="center">
        {this.props.dashboard ?
          (<p className="text-center text-h2 margin-normal">Contas externas</p>) :
          (<p className="text-center text-h2 margin-normal">Configure as suas contas externas</p>)
        }

        <ul>
          <p className="text-center margin-normal">Alguns dos seus comportamentos sustentáveis requerem autorização de contas externas.</p>
          {/* {listItems} */}


          {/* Google Fit */}
          <ExternalAccountOffline
            gfit
            login={this.gFitAuthorization}
            oneButton={true}
            account={gfitAccount}
            showButtons={true}
            unregister={this.unauthorizeGFit}
            registered={this.props.authorizations.includes('gfit')}
          />
          {/* EDP  */}
          <ExternalAccountOffline
            account={edpAccount}
            showButtons={true}
            signup={this.loginEDP}
            login={this.loginEDP}
            unregister={this.unauthorizeEDP}
            registered={this.props.authorizations.includes('edp')}
          />
          {/* GIRA  */}
          {/* <ExternalAccountOffline
            account={giraAccount}
            showButtons={true}
            oneButton={true}
            signup={this.loginGira}
            login={this.loginGira}
            unregister={this.unauthorizeGira}
            registered={this.props.authorizations.includes('gira')}
          /> */}
        </ul>

        <Snackbar
          open={this.state.snack}
          message={this.state.snackMessage}
          autoHideDuration={4000}
          onClose={() => this.setState({ snack: false })}
        />
        <FeedbackDialog
          close={() => this.setState({ dialog: false })}
          open={this.state.dialog}
          image={this.state.image}
          main={this.state.feedbackMain}
          message={this.state.feedbackMessage}
          buttonLabel={this.state.buttonLabel || "OK"}
        />
        <ConfirmationDialog
          image={this.state.image}
          close={() => this.setState({ confirmationDialog: false })}
          open={this.state.confirmationDialog}
          main={this.state.feedbackMain}
          message={this.state.feedbackMessage}
          positiveAction={'Verificar Google Fit'}
          negativeAction={'Cancelar'}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authorizations: state.authorizations,
    identity: state.identity,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authorize: (account, authorization) => dispatch(authorize({ account, authorization }))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExternalAccountsSetup));
