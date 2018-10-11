import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ShopInfo from './ShopInfo'
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';

// components
import { bonusAvailableForDate } from '../../../../utils/BonusUtils'


// images
import checkinInValid from '../../../../img/emoticon/sad_face.svg';
import checkInValid from '../../../../img/ilustracoes/parabens/parabens_ganhou_pontos.svg';
import goToMyLocation from '../../../../img/icones/24x24px/lojas/ver_localizacao.svg'
import closeIcon from '../../../../img/tour/fechar.svg'

// utils
import ShopUtils from '../../../../utils/ShopUtils';
import WalletUtils from "../../../../utils/WalletUtils";
import { checkConstraints } from "../../../../utils/BonusUtils";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { StringUtils } from "../../../../utils/StringUtils";

class CheckInDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      wallet: props.wallet,
      showBonus: props.showBonus
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return { open: nextProps.open };
  }

  handleBonusCollect = (bonus) => {
    const shopID = bonus.spotID;
    let feedbackMain, feedbackMessage, feedBackButton, thirdAction = undefined, image, close = this.close, negativeAction = StringUtils.bonusSuccess;
    const locationReporter = window.locationReporter;
    const walletSize = this.props.wallet.transactions.length;
    locationReporter.collect(bonus.id, shopID);

    this.setState({
      waitingCheckin: true
    });

    var interval = setInterval(checkWalletForBonus, 1000);
    let _this = this;
    var timesRun = 0;

    function checkWalletForBonus() {
      timesRun += 1;

      if (_this.props.transactions.length !== walletSize) {
        const lastTransaction =
          _this.props.wallet.transactions[
          _this.props.wallet.transactions.length - 1
          ];
        if (lastTransaction.description === "valid") {
          function addMinutes(date) {
            const minutesToAdd = 10;
            return new Date(date.getTime() + minutesToAdd * 60000).toLocaleTimeString();
          }
          feedbackMain = "Parabéns";
          const d = new Date();
          feedbackMessage = `Mostre este cartão até ${d.toLocaleDateString()} às ${addMinutes(d, 5)} para levantar ${bonus.name}.`;
          feedBackButton = StringUtils.bonusSuccess;
          image = bonus.successfulTransactionIcon;
          // moreBonus
          let shopBonuses = _this.props.bonus.filter(bonus => bonus.spotID === shopID);
          shopBonuses = shopBonuses.filter(bonus => bonusAvailableForDate(bonus));
          const moreBonusAvailable = shopBonuses.length > 1;
          if (moreBonusAvailable) {
            feedbackMessage += '</br></br>' + StringUtils.bonusOptions;
            feedBackButton = StringUtils.checkinDo;
            close = _this.closeShowCheckin();
            negativeAction = StringUtils.cancel;
            thirdAction = StringUtils.bonusMore;
          }
          else {
            negativeAction = undefined;
          }

        } else {
          // invalid
          feedbackMain = "Ups";
          feedbackMessage = "Não tem pontos suficientes pra usufruir do bónus";
          feedBackButton = StringUtils.bonusFailure;
          image = bonus.failedTransactionIcon;
        }
        _this.setState({
          openFeedback: true,
          negativeAction: negativeAction,
          feedbackMain: feedbackMain,
          feedbackMessage: feedbackMessage,
          feedBackButton: feedBackButton,
          image: image,
          close: close,
          thirdAction: thirdAction,
          waitingCheckin: false
        });
        // _this.props.close();
        clearInterval(interval);
        _this.setState({
          waitingCheckin: false
        });
      }

      if (timesRun === 20) {
        _this.props.close();
        clearInterval(interval);
      }
    }
  }


  handleCheckin = (shopID) => {
    let feedbackMain, feedbackMessage, feedBackButton, image, close = this.close, negativeAction = StringUtils.checkinSuccess;
    const { shops } = this.props;
    const locationReporter = window.locationReporter;
    const walletSize = this.props.wallet.transactions.length;
    locationReporter.checkin(shopID);

    this.setState({
      waitingCheckin: true
    });

    let interval = setInterval(checkWallet, 1000);

    let _this = this;

    let timesRun = 0;
    function checkWallet() {
      timesRun += 1;

      if (_this.props.wallet.transactions.length !== walletSize) {
        close = _this.close;
        const lastTransaction =
          _this.props.wallet.transactions[
          _this.props.wallet.transactions.length - 1
          ];
        if (lastTransaction.description === "valid") {
          const shopID = lastTransaction.data.shopID;
          function checkID(shop) {
            return shop.id === shopID;
          }
          const selectedShop = shops.filter(checkID)[0];
          let shopBonuses = _this.props.bonus.filter(bonus => bonus.spotID === selectedShop.id);
          shopBonuses = shopBonuses.filter(bonus => bonusAvailableForDate(bonus));
          const bonusAvailable = shopBonuses.length > 0;
          feedbackMain = "Parabéns";
          feedbackMessage = "Por ter feito check-in com sucesso acumulou <b>" + lastTransaction.value + '</b> pontos.';
          image = checkInValid;
          feedBackButton = StringUtils.checkinSuccess;
          if (bonusAvailable) {
            feedbackMessage += '</br></br>' + StringUtils.checkinBonusAvailable;
            feedBackButton = StringUtils.bonusesNew;
            close = _this.closeShowBonus();
          }
        } else if (lastTransaction.description === "invalid-location") {
          feedbackMain = "Localização incorreta";
          feedbackMessage = StringUtils.checkinFailureLocation;
          feedBackButton = StringUtils.checkinFailure;
          image = checkinInValid;
        } else if (lastTransaction.description === "invalid-timestamp") {
          feedbackMain = "Ups";
          feedbackMessage = StringUtils.checkinFailureMax;
          feedBackButton = StringUtils.checkinFailure;
          image = checkinInValid;
        }
        _this.setState({
          openFeedback: true,
          feedbackMain: feedbackMain,
          feedbackMessage: feedbackMessage,
          feedBackButton: feedBackButton,
          image: image,
          close: close,
          negativeAction: negativeAction,
          waitingCheckin: false
        });
        // _this.props.close();
        clearInterval(interval);
      }

      if (timesRun === 20) {
        _this.props.close();
        clearInterval(interval);
      }
    }
  }

  handleRequestCloseDialog = () => {
    this.props.close();
  };

  close = () => {
    this.setState({ openFeedback: false });
  };

  closeShowBonus = () => (action = false) => {
    this.close(action);
    this.setState({ showBonus: true });
  };

  closeShowCheckin = () => (action = false) => {
    this.close(action);
    if (action)
      this.setState({ showBonus: false });
  };

  validateCheckinPossibility = (shop, distance, waitingCheckin, lastCheckinToday, distanceMessage, bonus = false) => (selectedBonus = undefined) => {
    const maxDistance = 100;
    if (lastCheckinToday === true && bonus === false) {
      return (
        <React.Fragment>
          <p><strong>Já fez check-in hoje.<br />
          </strong>Regresse amanhã, por favor.</p>
        </React.Fragment>)
    }

    if (distance > maxDistance) {
      let message = (bonus === true) ? 'usufruir do bónus' : 'fazer check-in';
      return (
        <React.Fragment>
          <strong>Não pode {message}, dista {distanceMessage} da loja.</strong>
          <div onClick={() => this.props.closeAndGoToLocation()}>
            <img src={goToMyLocation} alt='' className="inline-block icon-small" />
            <p className="text-highlighted inline-block">Ver a minha localização</p>
          </div>
        </React.Fragment >)
    }

    if (distance < maxDistance) {
      if (bonus === true) {
        const valid = checkConstraints(selectedBonus, this.props.wallet.transactions);
        if (valid === true) {
          // check if credits are sufficient
          const bonusCredit = this.props.wallet['bonus-credit'];
          if (bonusCredit - selectedBonus.cost < 0) {
            // insufficient credits
            return (
              <React.Fragment>
                <p><strong>Não tem pontos suficientes pra usufruir do bónus.<br />
                </strong>Faltam-lhe {Math.abs(bonusCredit - selectedBonus.cost)} pontos para poder usufruir dele</p>
              </React.Fragment>)
          }
          return (<div style={{ position: 'relative' }}>
            <Button
              variant="raised"
              color="primary"
              disabled={waitingCheckin}
              fullWidth={true}
              onClick={(shopID, bonusID) => this.handleBonusCollect(selectedBonus)}
            >
              usufruir de bónus
      </Button>
            {waitingCheckin && <CircularProgress size={24} style={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: -12,
              marginLeft: -12,
            }} />}
          </div >)
        } else {
          // constraints not met
          return (
            <React.Fragment>
              <p><strong>Já levantou este bónus o número máximo de vezes hoje.<br />
              </strong>Tente novamente amanhã, por favor.</p>
            </React.Fragment>)
        }

      }
      else {
        return (<div style={{ position: 'relative' }}>
          <Button
            variant="raised"
            color="primary"
            fullWidth={true}
            disabled={waitingCheckin}
            onClick={shopID => this.handleCheckin(shop.id)}
          >
            fazer check-in
                  </Button>
          {waitingCheckin && <CircularProgress size={24} style={{
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
          }} />}
        </div>)
      }
    }
    else {
      return (<div className="text-center">
        <p className="text-highlighted">A sua localização não coincide com o seu check-in</p>
      </div>)
    }
  };




  render() {
    const { classes, shop, shops, position, bonusID, showBonus } = this.props;
    const { waitingCheckin } = this.state;
    let shopBonuses = this.props.bonus.filter(bonus => bonus.spotID === shop.id);
    shopBonuses = shopBonuses.filter(bonus => bonusAvailableForDate(bonus));

    const userPosition = position ? position : { lat: 0, lng: 0 };

    let shopUtils = new ShopUtils(shops);

    let distance = shopUtils.getDistanceToShopByShop(shop, userPosition);
    let distanceMessage = (distance > 1000) ? Math.round(distance / 1000) + ' km' : Math.round(distance) + ' m';

    let walletUtils = new WalletUtils(this.props.wallet.transactions);
    const lastCheckinToday = walletUtils.hasCheckedInToday(shop.id);

    return (
      <div>
        <Dialog
          classes={{ root: classes.dialogRoot, paper: classes.paper }}
          fullWidth={true}
          open={this.state.open}
          onClose={this.handleRequestCloseDialog}
          disableBackdropClick={true}
          BackdropProps={{
            classes: {
              root: classes.backDropRoot
            }
          }}
        >
          <DialogContent classes={{ root: classes.dialogContent }} >
            <div className="bg-dialog-top">
              <div className="col-2">
                <Avatar src={shop.picture} className="avatar-small" />
              </div>
              <div className="col col-full-width">
                <p className="shop-name" style={{ padding: '10px 0' }}>{shop.name}</p>
              </div>
              <div className="col-2 text-center">
                <img src={closeIcon} alt='' className="text-center inline-block icon-24" onClick={this.props.close} />
              </div>
            </div>
            <div className="col" style={{ padding: '0px', marginTop: '10px' }}>
              <ShopInfo
                shop={shop}
                bonus={shopBonuses}
                position={position}
                showBonus={showBonus || this.state.showBonus}
                bonusID={bonusID}
                validateCheckin={this.validateCheckinPossibility(shop, distance, waitingCheckin, lastCheckinToday, distanceMessage)}
                validateCollect={this.validateCheckinPossibility(shop, distance, waitingCheckin, lastCheckinToday, distanceMessage, true)}
              />
            </div>

          </DialogContent>
        </Dialog>
        <ConfirmationDialog
          close={this.state.close}
          open={this.state.openFeedback}
          main={this.state.feedbackMain}
          message={this.state.feedbackMessage}
          positiveAction={this.state.feedBackButton}
          negativeAction={this.state.negativeAction}
          image={this.state.image}
          thirdAction={this.state.thirdAction}
        />
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    wallet: state.wallet,
    transactions: state.wallet.transactions,
    bonus: state.bonus,
    position: state.position,
    shops: state.shops
  };
};

const styles = {
  dialogContent: {
    paddingTop: '0px !important',
  },
  backDropRoot: {
    display: 'none'
  },
  dialogRoot: {
    top: 'unset',
    marginBottom: '56px!important'
  },
  paper: {
    boxShadow: 'unset !important',
    marginBottom: '0px!important',
    marginLeft: '10px',
    marginRight: '10px',
    marginTop: '0px',

  }
};

export default withStyles(styles)(connect(mapStateToProps, null)(withRouter(CheckInDialog)));
