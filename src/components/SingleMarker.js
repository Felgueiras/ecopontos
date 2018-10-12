import React, { Component } from 'react';
import { connect } from "react-redux";
import { GoogleMap, Marker, withGoogleMap, withScriptjs, KmlLayer } from 'react-google-maps';
import Ecoponto from './EcopontoDialog';
import ecoponto from "../img/recycle.png";


const ecopontoMarker = {
    url: ecoponto,
    // scaledSize: {50k}
};



export default class SingleMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    close = () => {
        this.setState({ open: false });
    };

    render() {
        const { marker } = this.props;

        const { lat, lng } = marker;
        const { open } = this.state;

        const handleMarkerClick = () => {
            this.setState({ open: true });
        };


        return (
            <div>
                <Marker
                    icon={ecopontoMarker}
                    position={{ lat: lat, lng: lng }}
                    onClick={() => handleMarkerClick(marker)}
                />
                <Ecoponto
                    ecoponto={marker}
                    open={open}
                    close={this.close}
                />
            </div>
        );
    }
}

