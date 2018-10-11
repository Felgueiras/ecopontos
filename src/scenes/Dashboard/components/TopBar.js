import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Joyride from "react-joyride";

// import CountUp from 'react-countup';

// icons
import totalPointsIcon from '../../../img/icones/32x32px/header/total_pontos.svg';
import rankingIcon from '../../../img/icones/32x32px/header/posicao.svg';
import promotionIcon from '../../../img/icones/32x32px/header/pontos_adobrar.svg';


class TopBar extends Component {



  state = {
    start: 0,
    run: false
  }


  componentDidUpdate(prevProps) {
    if (this.props.balance !== prevProps.balance) {
      // animate balance increase
      this.setState({ start: prevProps.balance });
    }
  }




  render() {
    let balance = 0;
    if (this.props.wallet) {
      balance = this.props.wallet.balance;
    }

    let {ranking} = this.props;

    const run = this.props.run;
    const steps = this.props.steps;

    return (
      <div className="bg-topbar" >
        <Joyride
          locale={{ back: 'Voltar atrás', close: 'Fechar', last: 'Terminar', next: 'Próximo', skip: 'Ignorar' }}
          continuous
          scrollToFirstStep
          showProgress
          showSkipButton
          run={run}
          steps={steps}
          callback={this.handleJoyrideCallback}
          styles={{
            options: {
              arrowColor: '#e3ffeb',
              backgroundColor: '#e3ffeb',
              primaryColor: '#000',
              textColor: '#004a14',
              overlayColor: 'rgba(79, 26, 0, 0.4)',
            }
          }}
        />
        <div className="row top-bar-row">
          {/* // tokens */}
          <div className="col-6 walk_points text-center" >
            <img src={totalPointsIcon} alt='' className="icon-normal image-top-bar" />
            <p className="header-text inline-block">
              {balance}
              {/* 
              <CountUp
                start={this.state.start}
                end={balance}
                // onComplete={() => this.setState({ start: balance })}
                duration={3} /><br />
             */}
              <br />
              <span className="header-text-smaller">pontos</span>
            </p>
          </div>

          <div className="col-6 walk_ranking text-center">
            <img src={rankingIcon} alt='' className="icon-normal image-top-bar" />
            <p className="header-text inline-block">{ranking}º<br></br>
              <span className="header-text-smaller">lugar</span>
            </p>
          </div>


          {/*  
          <div className="col-4 walk_promotion top-bar-right" >
            <img src={promotionIcon} alt='' className="icon-normal image-top-bar" />
            <p className="header-text inline-block">x2<br></br>
              <span className="header-text-smaller">e-cars</span>
            </p>
          </div>
        */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state.hasOwnProperty('wallet')) {
    if (state.wallet.balance) {
      return {
        wallet: state.wallet,
        balance: state.wallet.balance,
        ranking: state.wallet.ranking,
      };
    }
  }
  return { wallet: state.wallet };
};

export default withRouter(connect(mapStateToProps, null)(TopBar));
