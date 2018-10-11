import React from "react";
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";

// material UI
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { finishedSetup } from '../../../redux/actions/index'

import winTokens from "../../../img/ilustracoes/comece_ganhar/parabens_ganhou_pontos.svg";
import giraPromo from "../../../img/ilustracoes/comece_ganhar/pontos_adobrar.svg";

import styles from "../../../css/index.css";
import KPIUtils from "../../../utils/KPIUtils";

class SettingsDone extends React.Component {

  constructor(props) {
    super(props);

    this.props.finishedSetup();

    let numHyperties = 3;
    if (this.props.authorizations.includes('gfit'))
      numHyperties++;
    // if (this.props.authorizations.includes('edp'))
    //   numHyperties++;

    this.state = {
      numHyperties: numHyperties
    }

    KPIUtils.registeredUser(this.props.cause.id);
  }


  goToDashboard = () => {

    window.hypertiesToLoad = this.state.numHyperties;
    const loaded = window.hypertiesToLoad === window.hypertiesStarted;
    if (loaded === true) {
      window.hypertiesStarted = true;
      window.completed = true;
      this.props.history.replace("/dashboard/panel");
    }
    else {
      window.settingsWaiting = true;
      this.props.history.replace("/dashboard");
    }
  }

  goBackToSetup() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="text-center">
        <AppBar position="static" elevation={0}>
          <Toolbar disableGutters={true}>
            <Typography
              variant="title"
              color="inherit" >
              Comece a ganhar
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="content">
          <div className="margin-big center-vertical" style={{ width: '80%' }} >
            <img src={winTokens} alt="Thumbnail" className="margin-normal image-normal" />
            <p className="text-h1 margin-normal">Parabéns!</p>
            <p className="text-h2-not-bold margin-normal">
              Por ter concluído a definição da sua conta acumulou
            <strong > 10 pontos.</strong>
            </p>
            <br />
            <p className="text-small margin-normal">
              Recomendamos que instale a app para ter uma melhor experiência de utilização.
            </p>
          </div>
          {/* 
          <Divider className="margin-big" />
          <div >
            <img src={giraPromo} alt="Thumbnail" className="margin-normal image-normal" />
            <p
              className="text-h2-not-bold">
              Duplique os seus pontos<br />utilizando a
            <strong > GIRA.</strong>
              e ganhe bónus
          </p>
          </div>
           */}
        </div>
        <div className="to-bottom">
          <Button
            onClick={this.goToDashboard}
            color="primary"
            variant="raised"
            className={styles.btn}
          >
            Começar a ganhar
            </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authorizations: state.authorizations,
    cause: state.cause,
  };
};


const mapDispatchToProps = dispatch => {
  return {
    finishedSetup: walkthrough => dispatch(finishedSetup())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingsDone));
