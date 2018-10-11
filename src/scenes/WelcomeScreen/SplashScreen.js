import React from "react";
import PropTypes from 'prop-types'
import { withRouter } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';

// redux
import { connect } from "react-redux";

// styles
import '../../animations/styles.css';
import { withOfflineBehaviour } from '../../utils/HoCs'

// logo
import logo from "../../img/ilustracoes/splashscreen/sharinglisboa_logo_283x112_splash.svg";
import logoEU from "../../img/ilustracoes/splashscreen/uniaoeuropeia_logo.svg";
import background from "../../img/ilustracoes/splashscreen/sharinglisboa_splashscreen_bck.svg";
import qr from '../../img/qr/qr.png'

import { mainColor } from "../../constants/theme";

const addBack = {
  backgroundImage: `url(${background})`,
  backgroundRepeat: "no-repeat",
  // backgroundSize: "cover"
  backgroundPositionY: 'bottom',
  backgroundColor: mainColor
};



class SplashScreen extends React.Component {

  state = {
    message: false
  }

  constructor(props) {
    super(props);

    // already used
    if (props.login) {
      if (props.finishedSetup === false) {
        // finish setup
        this.props.history.replace("/setup");
      } else {
        // finished setup
        if (props.logged) {
          // logged
          this.props.history.replace("/dashboard");
        }
        else {
          // not logged
          this.props.history.replace("/login");
        }
      }

    }
    else {
      // never used the app
      setTimeout(() => {
        this.props.history.replace("/screens");
      }, 4500);
    }
  }

  componentDidMount() {
    let _this = this;
    setTimeout(() => {
      _this.setState({ message: true })
    }, 100);
  }

  render() {

    const { setupInfo } = this.props;

    const getInvalidSetupInfo = function () {
      console.log(setupInfo);

      const { mobile, android, browser } = setupInfo;
      if (!mobile) {
        return (
          <React.Fragment>
            <p>Não está num dispositivo móvel. Para poder usar a app faça scan do código QR em baixo</p>
            <img src={qr} className="margin-top-normal logo-small" alt="" />
          </React.Fragment>
        );
      }

      if (!android) {
        return (
          <p>Esta aplicação encontra-se disponível somente em dispositivos Android</p>
        );
      }

      if (!browser) {
        return (
          <p>Esta aplicação encontra-se disponível somente para Chrome e Firefox</p>
        );
      }

    }


    return (
      <div className="center text-center container-1 full-height text-highlighted-secondary" style={addBack}>
        <img src={logo} className="image-splash" alt="Thumbnail" />
        <CSSTransition
          in={this.state.message}
          timeout={3000}
          classNames="message"
          mountOnEnter
          unmountOnExit
        >
          <React.Fragment>
            <p className="margin-top-normal ">Uma Lisboa mais sustentável.</p>
          </React.Fragment>
        </CSSTransition>
        {setupInfo && (
          <div style={{ marginTop: '100px' }}>
            {getInvalidSetupInfo()}
          </div>
        )
        }
        <div className="text-center to-bottom" >
          <img src={logoEU} className="icon-normal" alt="Thumbnail" style={{ marginBottom: '8px' }} />
          <p className="text-smaller">
            Este projeto é financiado pelo programa de pesquisa e inovação European Horizon 2020, ao abrigo da Convenção de Subvenção nº 691895
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logged: state.logged,
    login: state.login,
    finishedSetup: state.finishedSetup,
  };
};

SplashScreen.propTypes = {
  setupInfo: PropTypes.object,
  login: PropTypes.string,
  logged: PropTypes.bool,
}



export default withRouter(withOfflineBehaviour(true)(connect(mapStateToProps, null)(SplashScreen)));
