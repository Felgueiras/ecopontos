import React from "react";
// redux
import { connect } from "react-redux";
import { setCause, setCode } from "../../../redux/actions/index";

import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";

import {
  setWallet,
  setPublicWallets,
  setIdentity
} from "../../../redux/actions/index";
import {
  startWallet,
  startGroupChatManager,
  CRMaddress
} from "../../Dashboard/runtimeHelper";

// APIs
import CauseAPI from "../../../services/api/CauseAPI";
import { ListItemSecondaryAction } from "@material-ui/core";

const styles = {
  block: {
    maxWidth: 250
  },
  radioButtonUnselected: {
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "#eeeeee"
  },
  radioButtonSelected: {
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "#eaf4f0"
  },
  inputStyle: {
    position: "absolute",
    right: "20px",
    top: "20px"
  }
};

class CauseChallengeSetup extends React.Component {
  handleFiltering = () => {
    console.log("filtering");
  };

  constructor(props) {
    super(props);

    this.state = {
      snack: false,
      snackMessage: "",
      cause: this.props.cause ? this.props.cause : null
    };
  }

  checkConditionsAndCause = () => {
    if (!this.state.cause) {
      this.setState({
        snack: true,
        snackMessage: "Tem de selecionar uma das causas"
      });
      return;
    }

    const { code, setCode } = this.props;
    startWallet(this.props.setWallet, this.props.setIdentity, this.props.wallet, window.personalData, this.props.setPublicWallets).then(function (res) {
      if (!res) {
        setCode(undefined);
        return;
      }
      const { role } = res.body;
      if (role === 'agent') {
        startGroupChatManager().then(function () {
          let { groupChatManager } = window;
          groupChatManager.myIdentity().then(function (identity) {
            groupChatManager.register(CRMaddress, code, identity);
          });
        });
      }
      else {
        // invalid code
        setCode(undefined);
      }
    });
    this.props.handleNext();
  };

  handleRequestClose = () => {
    this.setState({
      snack: false
    });
  };

  getStyle = cause => {
    if (this.state.cause) {
      if (this.state.cause.name === cause.name)
        return styles.radioButtonSelected;
    }
    return styles.radioButtonUnselected;
  };

  handleChange = event => {
    var causes = CauseAPI.fetchCauses();
    const causeID = event.target.value;
    // get cause with that ID
    const cause = causes.filter(cause => cause.id === causeID)[0];
    this.setState({ cause: cause });
    this.props.setCause(cause);
  };

  render() {
    //  fetch causes
    const { classes } = this.props;

    var causes = CauseAPI.fetchCauses();
    const listItems = causes.map((cause, index) => (
      <FormControlLabel
        key={"cause_setup_" + index}
        value={cause.id}
        style={this.getStyle(cause)}
        classes={{ label: classes.label, root: classes.root }}
        control={<Radio />}
        label={
          <span>
            <ListItem
              classes={{
                container: classes.container,
                gutters: classes.gutters
              }}
            >
              <p className="text-small" style={{ marginRight: "10px" }}>
                {" "}
                {cause.name}
              </p>
              <ListItemSecondaryAction>
                <Avatar
                  src={cause.thumbnail}
                  className="avatar-normal avatar-cause"
                />
              </ListItemSecondaryAction>
            </ListItem>{" "}
          </span>
        }
      />
    ));

    return (
      <div className="text-center">
        <p className="text-h2 margin-normal">
          Apoie uma das causas em desafio e contribua para um parque escolar
          mais sustentável.
        </p>
        <FormControl component="fieldset" required className="full-width">
          <RadioGroup
            aria-label="cause"
            name="cause"
            value={this.state.cause ? this.state.cause.id : null}
            onChange={this.handleChange}
          >
            {listItems}
          </RadioGroup>
        </FormControl>

        <div
        // className="to-bottom"
        >
          <Button
            variant="raised"
            color="primary"
            onClick={this.checkConditionsAndCause}
            fullWidth={true}
          >
            passo seguinte
          </Button>
        </div>
        <Snackbar
          open={this.state.snack}
          message={this.state.snackMessage}
          autoHideDuration={4000}
          onClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCause: cause => dispatch(setCause(cause)),
    setIdentity: cause => dispatch(setIdentity(cause)),
    setCode: code => dispatch(setCode(code)),
    setWallet: wallet => dispatch(setWallet(wallet)),
    setPublicWallets: wallets => dispatch(setPublicWallets(wallets))
  };
};

const mapStateToProps = state => {
  return {
    wallet: state.wallet,
    cause: state.cause,
    code: state.code,
    publicWallets: state.publicWallets
  };
};

const stylesMUI = {
  label: {
    width: "100% !important"
  },
  root: {
    borderRadius: "4px",
    marginBottom: "4px"
  },
  container: {
    listStyle: "none !important",
    padding: "16px",
    paddingLeft: "0px"
  },
  gutters: {
    paddingLeft: "0px !important"
  }
};

export default withStyles(stylesMUI)(connect(mapStateToProps, mapDispatchToProps)(CauseChallengeSetup));
