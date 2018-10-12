import React from 'react'
import MapComponent from './components/MapComponent';

export default class App extends React.Component {

    state = {
        display: {}
    }

    render() {
        return (
            <React.Fragment>
                <MapComponent display={this.state.display} />
            </React.Fragment>
        )
    }
}