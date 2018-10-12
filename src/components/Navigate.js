
import { connect } from "react-redux";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { MapWithADirectionsRenderer } from './MapWithADirectionsRenderer'



class Navigate extends Component {

    getEcopontoByKey = (key) => {
        let ret = "";
        this.props.ecopontos.forEach(ecoponto => {

            if (ecoponto.fid === key) {
                ret = ecoponto;
            }
        });
        return ret;
    }

    constructor(props) {
        super(props);

        const ecopontoRef = this.props.match.params.id;
        const ecoponto = this.getEcopontoByKey(ecopontoRef);
        this.state = {
            ecoponto: ecoponto
        }
    }


    render() {

        const { ecoponto } = this.state;
        const { userLocation } = this.props;

        return (
            <div className="text-center">
                <MapWithADirectionsRenderer
                    origin={{ lat: userLocation.lat, lng: userLocation.lng }}
                    destination={{ lat: ecoponto.lat, lng: ecoponto.lng }}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ecopontos: state.ecopontos,
        userLocation: state.userLocation,
    };
};

export default connect(mapStateToProps, null)(withRouter(Navigate));