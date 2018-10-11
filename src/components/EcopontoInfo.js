import React from 'react'
import PropTypes from 'prop-types'
import { EcoServices } from './EcoServices';
import { Button } from '@material-ui/core';
import { withRouter } from "react-router-dom";




export const EcopontoInfo = withRouter((props) => {

    const report = () => {
        console.log('report');
        props.history.push('/report/' + props.ecoponto.ref);
    }

    const { name, services, entity } = props.ecoponto;
    return (
        <React.Fragment>
            <p>{name}</p>
            {/* <p>{`${lat}-${lng}`}</p> */}
            {/* TODO: distance */}
            <p>Está a 100 m de distância</p>
            <p>{`Entidade: ${entity}`}</p>
            <EcopontoServices
                services={services}
            />
            <Button
                onClick={report}
                variant="contained"
                color="secondary"
            >
                reportar problema
                </Button>
        </React.Fragment>

    )
})


const EcopontoServices = ({ services }) => {
    // const { vidrao, eletrao } = services;

    const getServices = () => {
        let toReturn = [];
        for (var property in services) {
            if (services.hasOwnProperty(property)) {
                if (services[property]) {
                    toReturn.push(EcoServices.getNameForService(property));
                }
            }
        }
        return toReturn;
    }
    return (
        <React.Fragment>
            <p>Serviços disponíveis:</p>
            {
                getServices().map((partner) => (
                    <div>
                        <p>{partner}</p>
                        {/* <img src={partner} alt='' style={{
                            maxWidth: '100%',
                            maxHeight: '100%'
                        }} /> */}
                    </div>
                ))
            }
        </React.Fragment>
    )
}



EcopontoInfo.propTypes = {
    ecoponto: PropTypes.object.isRequired,
}
