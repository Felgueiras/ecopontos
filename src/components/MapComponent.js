import React, { Component } from 'react';
// import axios from 'axios';
import { GoogleMap, Marker, withGoogleMap, withScriptjs, KmlLayer } from 'react-google-maps';
import { EcoServices } from './EcoServices';
import Ecoponto from './EcopontoDialog';
import { ecopontos } from './ecopontos';
import { AppBar, Toolbar, Typography } from "@material-ui/core";



class SingleMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    close = () => {
        this.setState({ open: false });
    };

    render() {
        const { marker } = this.props;
        const { location } = marker;
        const { open } = this.state;

        const handleMarkerClick = () => {
            this.setState({ open: true });
        };

        // const image = {
        //     url: logo,
        //     scaledSize: new google.maps.Size(48, 48)
        // };
        return (
            <div>
                <Marker
                    position={{ lat: location.lat, lng: location.lng }}
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



class MapWithEcopontosReact extends Component {
    
    state = {
        user: { lat: 40, lng: 10 }
    }

    componentDidMount() {
        let _this = this;

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => _this.setState({ user: { lat: position.coords.latitude, lng: position.coords.longitude } }));
        }

        // TODO: fetch ecopontos.kml
        // axios.get(`https://jsonplaceholder.typicode.com/users`)
        //     .then(res => {
        //         const persons = res.data;
        //         this.setState({ persons });
        //     })
    }

    render() {
        return (
            <GoogleMap
                defaultZoom={16}
                center={this.state.user}
            >
                <KmlLayer
                    url="http://ckan.sig.cm-agueda.pt/dataset/e5738237-3a7c-4a81-97dc-9c2dc604f7cd/resource/af51f772-fd79-4518-bdbc-064b6da2d8ca/download/ecopontos.kml"
                    options={{ preserveViewport: true }}
                />
                {this.props.markers.map(marker => {
                    return (
                        <React.Fragment>
                            <SingleMarker marker={marker} />
                        </React.Fragment>
                    );
                })}

            </GoogleMap>
        )

    }
}

const MapWithEcopontos = withScriptjs(withGoogleMap(MapWithEcopontosReact));

export default class MapComponent extends React.Component {

    filterByService(display) {

        // every one
        let ecosToReturn = ecopontos.slice();
        // for each ecoponto
        ecopontos.forEach(eco => {
            const { services } = eco;
            // check if service is included
            EcoServices.services.forEach(service => {
                if (display[service.key]) {
                    // filter by this "key"
                    if (!services[service.key]) {
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

    render() {
        const { display } = this.props;
        let markers = display ? this.filterByService(display) : ecopontos;
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
                            Ecopontos
                        </Typography>
                    </Toolbar>
                </AppBar>
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

