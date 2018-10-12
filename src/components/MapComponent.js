
import React, { Component } from 'react';
import { connect } from "react-redux";
import { GoogleMap, Marker, withGoogleMap, withScriptjs, KmlLayer } from 'react-google-maps';
import { EcoServices } from './EcoServices';
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Search from './Search';





// icons
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import { setUserLocation } from '../redux/actions';
import { MapWithEcopontos } from './MapWithEcopontos';

class MapComponent extends React.Component {

    state = {
        filtering: false
    }

    componentDidMount() {
        let _this = this;

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
                const userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
                // _this.setState({ user: userLocation });
                _this.props.setUserLocation(userLocation);
            });
        }
    }

    filterByService(fitlerBy) {
        const services = EcoServices.getServices();
        const { ecopontos } = this.props;

        let ecosToReturn = ecopontos.slice();
        // for each ecoponto
        ecopontos.forEach(eco => {
            // check if service is included in search
            services.forEach(service => {
                if (fitlerBy[service]) {
                    if (!eco[service]) {
                        // eco does not contain service, remove
                        var index = ecosToReturn.indexOf(eco);
                        if (index > -1) {
                            ecosToReturn.splice(index, 1);
                        }
                    }
                }
            });
        });
        return ecosToReturn;
    }

    toggleSearch = () => {
        let { filtering } = this.state;
        this.setState({ filtering: !filtering });
    }

    render() {
        const { ecopontos } = this.props;
        const { filtering, filterBy } = this.state;

        let markers = ecopontos;
        if (filtering && filterBy) {
            markers = this.filterByService(filterBy)
        }

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        {/* <IconButton
                            onClick={this.toggleDrawer}
                            aria-label="Menu"
                            className="hamburguer_icon">
                            <MenuIcon />
                        </IconButton> */}
                        <Typography
                            variant="title"
                            color="inherit" >
                            Ecopontos@Águeda
                        </Typography>
                    </Toolbar>
                </AppBar>
                {filtering ? (
                    <React.Fragment>
                        <Search handle={(filter) => this.setState({ filterBy: filter })} />
                        <ExpandLess className="text-center" onClick={this.toggleSearch} />
                    </React.Fragment>


                ) : (
                        <ExpandMore className="text-center" onClick={this.toggleSearch} />
                    )}
                <MapWithEcopontos
                    markers={markers}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBKaXLrKOJgX0EWaiZ0cZ92T7175z4UQ30"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `500px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ecopontos: state.ecopontos
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setUserLocation: location => dispatch(setUserLocation(location))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
