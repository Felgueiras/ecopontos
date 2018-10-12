import React, { Component } from 'react';
import { connect } from "react-redux";
import { GoogleMap, Marker, withGoogleMap, withScriptjs, KmlLayer } from 'react-google-maps';
import SingleMarker from './SingleMarker';
import myMarker from "../img/person.svg";

const userMarker = {
    url: myMarker,
    // scaledSize: new google.maps.Size(48, 48)
};

class MapWithEcopontosReact extends Component {

    render() {

        const { userLocation } = this.props;

        return (
            <GoogleMap
                defaultZoom={16}
                center={userLocation}
            >
                {this.props.markers.map(marker => {
                    return (
                        <React.Fragment>
                            <SingleMarker marker={marker} />
                        </React.Fragment>
                    );
                })}
                <Marker
                    position={userLocation}
                    icon={userMarker}
                // onClick={() => handleMarkerClick(marker)}
                />

            </GoogleMap>
        )

    }
}

const mapStateToProps = state => {
    return {
        userLocation: state.userLocation
    };
};

export const MapWithEcopontos = connect(mapStateToProps, null)(withScriptjs(withGoogleMap(MapWithEcopontosReact)));