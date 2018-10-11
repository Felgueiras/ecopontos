/*global google*/

import React from "react";
// components
import CheckInDialog from "./CheckInDialog";

import { withRouter } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { setPosition } from "../../../../redux/actions/index";

import logo from "../../../../img/icones/48x48px/mapa/pin_loja.svg";
import myMarker from "../../../../img/icones/48x48px/mapa/pin_minha_localizacao.svg";

import { withGoogleMap, GoogleMap, Marker, withScriptjs } from "react-google-maps";
import errorIcon from '../../../../img/emoticon/sad_face.svg'

import FeedbackDialog from "../../components/FeedbackDialog";

const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const mapStateToProps = state => {
  return {
    shops: state.shops,
    position: state.position,
    permissions: state.permissions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPosition: position => dispatch(setPosition(position))
  };
};

class SingleMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    // convert location
    this.position = {
      lat: this.props.shop.location["degrees-latitude"],
      lng: this.props.shop.location["degrees-longitude"]
    };


  }

  handleMarkerClick = () => {
    // show check-in dialog
    this.setState({ open: true });
  };

  close = () => {
    this.setState({ open: false });
  };

  render() {
    const image = {
      url: logo,
      scaledSize: new google.maps.Size(48, 48)
    };
    return (
      <div>
        <Marker
          className="icon-48"
          icon={image}
          position={this.position}
          onClick={this.handleMarkerClick}
        />
        <CheckInDialog
          shop={this.props.shop}
          open={this.state.open}
          close={this.close}
        />
      </div>
    );
  }
}



const MapComponent = connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap((props) => {
  const marker = {
    url: myMarker,
    scaledSize: new google.maps.Size(48, 48)
  };

  const { center, isMarkerShown, shops, userPosition } = props;
  return (
    <div>
      <GoogleMap
        defaultDraggable="false"
        defaultZoom={18}
        center={center}
        options={{
          disableDefaultUI: true
        }}
      >
        <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
          {isMarkerShown && (
            shops.map((shop, index) => (
              <div key={"marker_" + index}>
                <SingleMarker shop={shop} />
              </div>
            ))
          )
          }
        </MarkerClusterer>
        <Marker className="icon-48" icon={marker} position={userPosition} />
      </GoogleMap>
    </div>
  );
})))


class ShopsMap extends React.Component {
  constructor(props) {
    super(props);

    const { position, match, shops } = this.props;

    if (position) {
      this.state = {
        userPosition: position,
        mapCenter: position,
        dialogOpen: false
      };
    }
    else {
      this.state = {
        dialogOpen: false,
        userPosition: {
          lat: 0,
          lng: 0
        },
        mapCenter: {
          lat: 0,
          lng: 0
        }
      };
    }

    const shopID = match.params.id;
    const showBonus = match.path.includes('bonus');
    if (shopID && shopID !== 'all') {
      function checkID(shop) {
        return shop.id === shopID;
      }
      const selectedShop = shops.filter(checkID)[0];

      this.state = {
        shop: selectedShop,
        dialogOpen: true,
        showBonus: showBonus,
        bonusID: match.params.bonusID,
        userPosition: position,
        mapCenter: {
          lat: selectedShop.location["degrees-latitude"],
          lng: selectedShop.location["degrees-longitude"]
        }
      };
    }
  }

  componentDidMount() {

    let _this = this;
    // watch position
    function callback(newPosition) {
      console.log("New pos: ", newPosition);

      const nPos = {
        lat: newPosition.latitude,
        lng: newPosition.longitude
      };

      // if showing shop in map, do not set state!
      if (_this.state.dialogOpen !== true) {
        _this.setState({
          userPosition: nPos,
          mapCenter: nPos
        });
      }

      _this.props.setPosition({
        lat: newPosition.latitude,
        lng: newPosition.longitude
      })
    }

    function errorCallback(error) {
      if (error.code == error.POSITION_UNAVAILABLE)
        _this.setState({ dialog: true });
    }

    const shopID = this.props.shopID;
    if (!shopID) {
      if (window.locationReporter) {
        window.locationReporter.watchMyLocation(callback, errorCallback);
      }
    }
  }

  componentWillUnmount = () => {
    if (window.locationReporter) window.locationReporter.removeWatchMyLocation();
  };

  closeCheckinDialog = () => {
    this.setState({ dialogOpen: false });
  };

  closeErrorDialog = () => {
    this.setState({ dialog: false })
    this.props.history.goBack();
  }

  closeCheckinDialogGoToLocation = () => {
    this.setState({
      dialogOpen: false,
      mapCenter: this.props.position
    });
  };

  render() {
    const { mapCenter, userPosition } = this.state;
    const topBarHeight = window.jQuery(".top-bar").height();
    const bottomBarHeight = window.jQuery(".bottom-bar").height();
    const screenHeight = window.jQuery("#root").height();
    let mapHeight = screenHeight - topBarHeight - bottomBarHeight;


    return (
      <div className="container-inside">
        <MapComponent
          center={mapCenter}
          userPosition={userPosition}
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBKaXLrKOJgX0EWaiZ0cZ92T7175z4UQ30"
          loadingElement={<div className="full-height" />}
          containerElement={<div style={{
            height: `${mapHeight}px`
          }} />}
          mapElement={<div className="full-height" />}
          shopID={this.shopID}
        />
        <FeedbackDialog
          image={errorIcon}
          close={this.closeErrorDialog}
          open={this.state.dialog}
          main={"Sem localização"}
          message={"Detetámos que desligou a localização no seu telemóvel. Para continuar a ver as lojas, tem de ativar a localização."}
          buttonLabel={"Entendido"}
        />
        {this.state.shop &&
          <CheckInDialog
            showBonus={this.state.showBonus}
            shop={this.state.shop}
            open={this.state.dialogOpen}
            close={this.closeCheckinDialog}
            closeAndGoToLocation={this.closeCheckinDialogGoToLocation}
            bonusID={this.state.bonusID}
          />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShopsMap));
