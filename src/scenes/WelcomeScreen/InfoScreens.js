import React from 'react'
import Slider from "react-slick";

// material UI
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withOfflineBehaviour } from '../../utils/HoCs'

// redux
import { connect } from "react-redux";
// logo
import logo from '../../img/ilustracoes/onboarding/sharinglisboa_logo_142x56_ondboarding.svg'
import circle1 from '../../img/ilustracoes/onboarding/onboarding_1.svg'
import circle2 from '../../img/ilustracoes/onboarding/onboarding_2.svg'
import circle3 from '../../img/ilustracoes/onboarding/onboarding_3.svg'
import circle4 from '../../img/ilustracoes/onboarding/onboarding_4.svg'

import { withRouter } from 'react-router-dom'
import { StringUtils } from '../../utils/StringUtils';


const mapStateToProps = state => {
  return {
    logged: state.logged,
    network: state.network
  };
};


class InfoView extends React.Component {

  render() {
    return (
      <React.Fragment>
        <div className="text-center">

          <img src={this.props.circle} className="image-info" alt=""></img>
          <div className="text-h1 margin-normal">
            {this.props.text}
          </div>
          {this.props.subtext}
        </div>
      </React.Fragment>
    );
  }
}

class ConnectedInfoScreens extends React.Component {

  handleChange = (value) => {

    if (value === 3) {
      this.setState({
        skipping: false
      })
    }
    else {
      this.setState({
        skipping: true
      })
    }

  };

  constructor(props) {
    super(props);

    this.state = {
      skipping: true
    }
  }




  checkRuntime = () => {

    if (!window.runtime && !this.props.advance) {
      // circular progress (indeterminate)
      return (
        <React.Fragment>
          <CircularProgress
            size={40}
            className="margin-top-normal"
          />
          <p>A carregar... Por favor, aguarde.</p>
        </React.Fragment>

      );
    }

    if (this.state.skipping === true) {
      return <div className="margin-normal">
        <p className="text-highlighted">Ignorar</p>
      </div>
    }
    else {
      return <Button
        variant="raised"
        color="primary"
        fullWidth={true}>
        Começar agora!
        </Button>
    }
  }

  goToSetup = () => {
    if (this.props.checkNetwork() === false)
      return;

    this.props.history.replace("/setup");


    if (window.installPromptEvent)
      window.installPromptEvent.prompt();
  }


  render() {

    var settings = {
      autoplay: false,
      autoplaySpeed: 5000,
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      customPaging: i => (
        <div className="dot-div margin-top">
          <span className="dot"></span>
        </div>
      )
    };

    return (
      <div className="container-1">
        <img src={logo} className="logo-small" alt=""></img>
        <div>
          <Slider {...settings}
            afterChange={this.handleChange}>
            <div>
              <InfoView circle={circle1}
                text={StringUtils.tutorial1Text}
                subtext={StringUtils.tutorial1Subtext}
              />
            </div>
            <div>
              <InfoView circle={circle2}
                text={StringUtils.tutorial2Text}
                subtext={StringUtils.tutorial2Subtext}
              />
            </div>
            <div>
              <InfoView circle={circle3}
                text={StringUtils.tutorial3Text}
                subtext={StringUtils.tutorial3Subtext}
              />
            </div>
            <div>
              <InfoView circle={circle4}
                text={StringUtils.tutorial4Text}
                subtext={StringUtils.tutorial4Subtext}
              />
            </div>
          </Slider>
        </div>
        {this.props.history.location.pathname.includes('help') === false &&
          <div className="text-center to-bottom" onClick={this.goToSetup}>
            {this.checkRuntime()}
          </div>
        }
      </div>
    );
  }
}


const InfoScreens = connect(mapStateToProps, null)(ConnectedInfoScreens);
export default withOfflineBehaviour(true)(withRouter(InfoScreens));
