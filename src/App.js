import React from 'react'
import MapComponent from './components/MapComponent';
import FetchEcopontos from './components/FetchEcopontos';

export default class App extends React.Component {

    state = {
        display: {}
    }

    render() {
        return (
            <React.Fragment>
                {/* <MapComponent display={this.state.display} /> */}
                <FetchEcopontos />
            </React.Fragment>
        )
    }
}