import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';
import { EcopontoInfo } from "./EcopontoInfo";
import { EPS } from "./EPS";

import closeIcon from '../img/tour/fechar.svg'


class EcopontoDialog extends React.Component {
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
    let feedbackMain, feedbackMessage, feedBackButton, thirdAction = undefined, image, close = this.close;
    const locationReporter = window.locationReporter;
    const walletSize = this.props.wallet.transactions.length;
    locationReporter.collect(bonus.id, shopID);

    this.setState({
      waitingCheckin: true
    });


  }


  handleCheckin = (shopID) => {
    let feedbackMain, feedbackMessage, feedBackButton, image, close = this.close;
    const { shops } = this.props;
    const locationReporter = window.locationReporter;
    const walletSize = this.props.wallet.transactions.length;
    locationReporter.checkin(shopID);

    this.setState({
      waitingCheckin: true
    });


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
            {/* <img src={goToMyLocation} alt='' className="inline-block icon-small" /> */}
            <p className="text-highlighted inline-block">Ver a minha localização</p>
          </div>
        </React.Fragment >)
    }

    if (distance < maxDistance) {
      if (bonus === true) {
        const valid = true;
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
    const { classes, ecoponto } = this.props;
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
                <Avatar src={ecoponto.picture} className="avatar-small" />
              </div>
              <div className="col col-full-width">
                <p className="shop-name" style={{ padding: '10px 0' }}>{ecoponto.name}</p>
              </div>
              <div className="col-2 text-center">
                <img src={closeIcon} alt='' className="text-center inline-block icon-24" onClick={this.props.close} />
              </div>
            </div>
            <div className="col" style={{ padding: '0px', marginTop: '10px' }}>
              <EcopontoInfo
                ecoponto={ecoponto} />
            </div>

          </DialogContent>
        </Dialog>
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

export default withStyles(styles)(connect(mapStateToProps, null)(withRouter(EcopontoDialog)));
