import React from "react";
import { connect } from "react-redux";
import { setPermission } from '../../../redux/actions/index'

// MUI
import { Switch, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, SvgIcon } from "../../../../node_modules/@material-ui/core";
import { withStyles } from '@material-ui/core/styles';


class LocationSetup extends React.Component {

  constructor(props) {
    super(props);
    navigator.permissions.query({ name: 'geolocation' })
      .then(function (permissionStatus) {
        console.log('geolocation permission state is ', permissionStatus.state);

        permissionStatus.onchange = function () {
          console.log('geolocation permission state has changed to ', this.state);
        };
      });

    this.state = {
      location: this.props.permissions.includes('location')
    };
  }

  requestLocationPermission = () => {
    let _this = this;
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('Geolocation permissions granted');
      _this.props.setPermission('location', true);
    });

    // this.props.handleNext();
  }

  handleChange = name => event => {
    const permit = event.target.checked;
    this.setState({ location: permit });
    if (permit) {
      this.requestLocationPermission();
    } else {
      console.log('Canceling location permission');
      this.props.setPermission('location', false);
    }
  };


  render() {
    const classes = this.props.classes;


    return (
      <React.Fragment >
        <p style={{ marginBottom: '0px !important' }} className="text-center text-h2 margin-normal margin-top">GPS</p>
        <List
          classes={{ root: classes.root }}>
          <ListItem
            classes={{ root: classes.root }}
          >
            <ListItemIcon>
              <SvgIcon>
                <path fill="#32b1a4" d="M12 1.84a8 8 0 0 0-8 8c0 4.41 4.64 9.44 8 12.32 3.35-2.88 8-7.91 8-12.32a8 8 0 0 0-8-8zm0 17.66c-2.13-2-6-6.32-6-9.66a6 6 0 0 1 12 0c0 3.34-3.87 7.66-6 9.66z" className="c90ce4d2-15be-45ec-887b-02ad11d5fe7e" transform="translate(-4 -1.84)" />
                <circle fill="#32b1a4" cx="8" cy="8" r="3" className="c90ce4d2-15be-45ec-887b-02ad11d5fe7e" />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText primary="Acesso a localização" classes={{ primary: classes.primaryText }} />
            <ListItemSecondaryAction>
              <Switch
                checked={this.state.location}
                onChange={this.handleChange()}
                value="checkedB"
                color="primary"
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        {/* <div className="to-bottom"        >
          <Button
            variant="raised"
            color="primary"
            onClick={this.checkData}
            fullWidth={true}
          >
            passo seguinte
          </Button>
        </div> */}
      </React.Fragment >
    );
  }
}


const mapStateToProps = state => {
  return {
    permissions: state.permissions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPermission: (permission, authorization) => dispatch(setPermission({ permission, authorization }))
  };
};

const styles = {
  root: {
    paddingTop: '0px'
  },
  primaryText: {
    fontWeight: 'bold'
  }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LocationSetup));
