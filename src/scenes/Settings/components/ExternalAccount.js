import React from "react";
import PropTypes from 'prop-types';

// mui
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { withStyles } from '@material-ui/core/styles';

// CSS
import styles from "../../../css/index.css";
import KPIUtils from "../../../utils/KPIUtils";
import { mainColor } from "../../../constants/theme";

const backgroundStyleBase = {
  boxShadow: 'none',
  marginTop: '2px',
  paddingRight: '2px'
};

const backgroundStyleRegistered = {
  ...backgroundStyleBase,
  backgroundColor: "#eeeeee",

  // backgroundColor: mainColor,
};

const backgroundStyleNotRegistered = {
  ...backgroundStyleBase,
  backgroundColor: "#eeeeee",
};

const buttonStyle = {
  backgroundColor: "#eeeeee",
  boxShadow: 'none',
};



const colFullWidth = {
  paddingRight: "0px",
  paddingLeft: "0px"
};



class ExternalAccount extends React.Component {

  getBackgroundStyle() {
    return this.props.registered === true ? backgroundStyleRegistered : backgroundStyleNotRegistered;
  }

  handleSetNewAccount = () => {
    if (!this.props.checkNetwork())
      return;

    if (this.props.signup) {
      this.props.signup().then(function (res) {
      }).catch(function (reason) {
        console.error(reason);
      })
    }
  };

  handleSetExistingAccount = () => {
    const accountName = this.props.account.name;
    if (!this.props.checkNetwork())
      return;
    if (this.props.login) {
      this.props.login().then(function (res) {
        KPIUtils.externalAccountSetup(accountName);
      }).catch(function (reason) {
        console.error(reason);
      })
    }
  };

  handleClose = () => {
    this.setState({ registered: false });
  };

  handleDeactivate = () => {
    if (this.props.unregister) {
      this.props.unregister().then(function (res) {
      }).catch(function (reason) {
        console.error(reason);
      })
    }
  };

  getButtons = () => {
    const classes = this.props.classes;

    if (this.props.registered === false) {
      return <div className="row">
        {this.props.oneButton === true ? (<React.Fragment>
          <div className="col" style={{ paddingLeft: '1px', paddingRight: '0px', }}>
            <Button
              variant="raised"
              color="primary"
              classes={{ label: classes.labelStyle }}
              onClick={this.handleSetExistingAccount}
              className={styles.btnblock}
              style={this.getBackgroundStyle()}
              fullWidth={true}
              buttonStyle={buttonStyle}
            >
              Ativar
          </Button>
          </div>
        </React.Fragment>) : (<React.Fragment>

          <div className="col" style={{ paddingRight: '1px', paddingLeft: '0px' }}>
            <Button
              classes={{ label: classes.labelStyle }}
              variant="raised"
              color="primary"
              onClick={this.handleSetNewAccount}
              className={styles.btnblock}
              style={this.getBackgroundStyle()}
              fullWidth={true}
              buttonStyle={buttonStyle}
            >
              Criar conta
          </Button>
          </div>
          <div className="col" style={{ paddingLeft: '1px', paddingRight: '0px', }}>
            <Button
              variant="raised"
              color="primary"
              classes={{ label: classes.labelStyle }}
              onClick={this.handleSetExistingAccount}
              className={styles.btnblock}
              style={this.getBackgroundStyle()}
              fullWidth={true}
              buttonStyle={buttonStyle}
            >
              Já tenho conta
          </Button>
          </div>
        </React.Fragment>)}


      </div>;
    }
    else {
      return <div className="row">
        <div className="col" style={colFullWidth}>
          <Button
            variant="raised"
            color="primary"
            classes={{ label: classes.labelStyle }}
            onClick={this.handleDeactivate}
            className={styles.btnblock}
            style={this.getBackgroundStyle()}
            fullWidth={true}
            buttonStyle={buttonStyle}
          >
            Desativar
          </Button>
        </div>
      </div>
    }
  }


  render() {

    return (
      <div className="margin-normal account-div">
        <div className="row" style={this.getBackgroundStyle()}>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={this.props.account.thumbnail} style={{ marginRight: '5px' }} className="avatar-normal" />
            </ListItemAvatar>
            <p className="text-small">
              {this.props.gfit ? (
                <p>
                  {this.props.account.name} <br />Com o <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.fitness" > Google Fit</a> instalado pode usar o telemóvel ou um wearable para monitorizar a distância percorrida a pé ou de bicicleta e assim ganhar mais pontos. Se quiser também pode integrar o Google Fit com as suas
                <a target="_blank" rel="noopener noreferrer" href="https://play.google.com/store/apps/collection/promotion_3000e6f_googlefit_all"> aplicações favoritas de fitness.</a>
                </p>) : (
                  <p>
                    {this.props.account.name} - {this.props.account.description}
                  </p>

                )}
            </p>
          </ListItem>
        </div>
        {this.props.showButtons && (this.getButtons())}
      </div>
    );
  }
}

const stylesMUI = {
  labelStyle: {
    color: mainColor,
    textTransform: 'initial',
    fontWeight: 'medium'
  }
};

ExternalAccount.propTypes = {
  registered: PropTypes.bool.isRequired,
  account: PropTypes.object.isRequired,
}




export default withStyles(stylesMUI)(ExternalAccount);
