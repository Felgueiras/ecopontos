import React from 'react'
import PropTypes from 'prop-types'
import { EcoServices } from './EcoServices';
import { Button } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import GPSutils from '../GPSutils';

const EcopontoInfo = withRouter((props) => {

    const report = () => {
        console.log('report');
        props.history.push('/report/' + props.ecoponto.fid);
    }

    const navigate = () => {
        console.log('navigate');
        props.history.push('/navigate/' + props.ecoponto.fid);
    }


    const { lat: userLat, lng: userLng } = props.userLocation;


    const { name, propriedad, lat, lng } = props.ecoponto;

    let distance = GPSutils.getDifferenceBetweenGPSCoordinates(userLat, userLng, Number(lat), Number(lng));
    distance = Math.floor(distance);
    if (distance <= 1000) {
        distance += ' m';
    }
    else {
        distance = Math.floor(distance * 10 / 1000) / 10 + ' km';
    }

    return (
        <React.Fragment>
            <p>Está a {distance} de distância</p>
            <p>{`Entidade: ${propriedad}`}</p>
            <EcopontoServices
                ecoponto={props.ecoponto}
            />
            <div className="text-center">
                <Button
                    style={{ display: 'block' }}
                    onClick={report}
                    variant="contained"
                    color="secondary"
                >
                    reportar problema
                </Button>
                <Button
                    style={{ display: 'block' }}
                    onClick={navigate}
                    variant="contained"
                    color="secondary"
                >
                    navegar
                </Button>
            </div>
        </React.Fragment>
    )
})


const EcopontoServices = ({ ecoponto }) => {

    const getServices = () => {
        let toReturn = [];

        EcoServices.services.forEach(service => {
            if (ecoponto[service.key]) {
                toReturn.push(service);
            }
        });
        return toReturn;
    }
    return (
        <React.Fragment>
            <p>Serviços disponíveis:</p>
            {
                getServices().map((service) => (
                    <React.Fragment>
                        {/* <p>{service.name}</p> */}
                        <img src={service.icon} alt='' style={{
                            height: '50px',
                            width: 'auto',
                            display: 'inline'
                        }} />
                    </React.Fragment>
                ))
            }
        </React.Fragment>
    )
}




EcopontoInfo.propTypes = {
    ecoponto: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return {
        userLocation: state.userLocation
    };
};

export default connect(mapStateToProps, null)(EcopontoInfo);

