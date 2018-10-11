import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// material ui
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

// other components
import ShopUtils from '../../../../../utils/ShopUtils';
import CongratulationsDialog from '../../../components/CongratulationsDialog';

// icons
import creditsSufficient from '../../../../../img/icones/24x24px/bonus/creditos_suficientes.svg';
import creditsInsufficient from '../../../../../img/icones/24x24px/bonus/creditos_insuficientes.svg';
import bonusNear from '../../../../../img/icones/24x24px/lojas/ver_localizacao.svg'
import bonusFar from '../../../../../img/icones/24x24px/lojas/ver_localizacao_longe.svg'

const mapStateToProps = state => {
  return {
    bonus: state.bonus,
    shops: state.shops,
    position: state.position,
    wallet: state.wallet,
    transactions: state.wallet.transactions,
    bonusCredit: state.wallet['bonus-credit'],
  };
};


class Bonus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.shopUtils = new ShopUtils(this.props.shops);
  }

  close = () => {
    this.setState({ openFeedback: false });
  };

  selectBonus = bonus => e => {
    if (this.props.checkNetwork()) {
      if (this.props.shop !== undefined) {
        this.props.history.push("/dashboard/map/" + bonus.spotID + "/bonus/" + bonus.id);
      }
    }
  };


  render() {
    const { shop: shopForBonus, bonusCredit, distance, reward: bonus, causeBonus } = this.props;
    let info, imgIcon, attainable;
    attainable = (bonusCredit - bonus.cost < 0) ? false : true;


    switch (this.props.info) {
      case "cost":
        imgIcon = (attainable == true) ? creditsSufficient : creditsInsufficient;
        if (causeBonus === true) {
          // info = <div className="text-center" style={{ lineHeight: '1em' }}>
          //   <p>
          //     Bónus de causa
          //   </p>
          // </div>
        }
        else {

          info = <div className="text-center" style={{ lineHeight: '1em' }}>
            {bonus.cost}
            <img src={imgIcon} alt='' className="icon-normal" />
          </div>
        }
        break;
      case "distance":
        {
          let distanceText;
          let distanceIcon = (distance <= 100) ? bonusNear : bonusFar;
          if (distance < 10) {
            distanceText = 'Está perto';
          }
          else {
            if (distance <= 1000) {
              distanceText = Math.round(distance) + ' m';
            }
            else {
              distanceText = Math.round(distance / 1000) + ' km';
            }
          }

          info = <div className="text-center" style={{ lineHeight: '1em' }}>
            {distanceText}
            <img src={distanceIcon} alt='' className="icon-normal" />
          </div>
        }
        break;
      default:
        break;
    }

    // check expires date close
    const expireDate = new Date(bonus.expires);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    let expiresSoon = false;
    var tomorrow = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
    if (tomorrow.getFullYear() == expireDate.getFullYear() && tomorrow.getMonth() == expireDate.getMonth() && tomorrow.getDate() == expireDate.getDate()) {
      expiresSoon = true;
    }

    return (
      <React.Fragment>

        <div className="margin-top-normal" onClick={this.selectBonus(bonus)}>
          <div className="row">
            <div className="col-3">
              <Avatar src={bonus.icon} className="avatar-big" />
            </div>
            <div className="col-7">
              {shopForBonus !== undefined && (
                <p className="text-highlighted">{shopForBonus.name}</p>
              )}
              <p> Oferta de 1 {bonus.name} </p>
              <p className="text-smaller">
                Válido até  {(expiresSoon == true && attainable) ?
                  <b>amanhã!</b> : (bonus.expires)}
              </p>

            </div>
            <div className="col-2">
              {info}
            </div>
          </div>
        </div>
        <Divider />
        <CongratulationsDialog
          close={this.close}
          open={this.state.openFeedback}
          main={this.state.feedbackMain}
          message={this.state.feedbackMessage}
          buttonLabel={this.state.feedBackButton}
          image={this.state.image}
          error={this.state.error}
        />
      </React.Fragment>
    );
  }
}

Bonus.propTypes = {
  // bonus: PropTypes.object.isRequired,
  info: PropTypes.oneOf(['cost', 'distance']),
  causeBonus: PropTypes.bool.isRequired,
  bonus: PropTypes.object.isRequired,
}


export default withRouter(connect(mapStateToProps, null)(Bonus));
