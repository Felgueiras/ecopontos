import { MuiThemeProvider } from '@material-ui/core/styles';
import { withKnobs, button } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import React, { Component } from 'react';
import axios from 'axios';


// redux
import { Provider } from 'react-redux';
import { HashRouter, Redirect, Route } from 'react-router-dom';
// redux setup
import { createStore } from 'redux';
import muiTheme from '../src/constants/theme';
// CSS
import '../src/css/index.css';

import rootReducer from '../src/redux/reducers/index';

// help
import { initialState } from './reduxHelper'
import MapComponent from '../src/components/MapComponent';
import { EPS, EcopontoInfo } from '../src/components/EcopontoInfo';
import ResultsList from '../src/components/ResultsList';
import Search from '../src/components/Search';
import Report from '../src/components/Report';
import { ecopontos } from '../src/components/ecopontos';
import App from '../src/App';
import EcopontoDialog from '../src/components/EcopontoDialog';


const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const DSMDecorator = (content) => (
    <Provider store={store}>
        <HashRouter>
            <div style={{
                height: '100%',
                overflowY: 'auto',
                overflowX: 'hidden'
            }}>
                <MuiThemeProvider theme={muiTheme}>
                    {content()}
                </MuiThemeProvider>
            </div>
        </HashRouter>
    </Provider>
);

storiesOf('Ecopontos', module)
    .addDecorator(DSMDecorator)
    .add('fetch', () => (
        <FetchEcopontos />
    ))
    .add('reportar problema', () => (
        <Report
            ecoponto={initialState.ecopontos[0]} />
    ))
    .add('pesquisa', () => (
        <Search />
    ))
    .add('info ecoponto', () => (
        <EcopontoInfo
            ecoponto={initialState.ecopontos[0]}
        />
    ))
    .add('ecoponto dialog', () => (
        <EcopontoDialog
            ecoponto={initialState.ecopontos[0]}
            open={open}
        // close={this.close}
        />
    ));



export default class FetchEcopontos extends Component {
    componentDidMount() {


        // TODO: fetch ecopontos.csv
        const kml = 'http://ckan.sig.cm-agueda.pt/dataset/e5738237-3a7c-4a81-97dc-9c2dc604f7cd/resource/af51f772-fd79-4518-bdbc-064b6da2d8ca/download/ecopontos.kml'
        axios.get(kml)
            .then(res => {
                var parser, xmlDoc, elementDoc;
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(res.data, "text/xml");

                const elements = xmlDoc.getElementsByTagName("coordinates");
                for (let index = 0; index < elements.length; index++) {
                    const nodeValue = elements[index].childNodes[0].nodeValue;
                    const [ lat, lng ] = nodeValue.split(',');
                    console.log(lat);
                    
                }



                // elements.forEach(element => {
                //     console.log(element.textContent);

                // });
                // const persons = res.data;
                // this.setState({ persons });
            })
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}



storiesOf('Ecopontos/mapa', module)
    .addDecorator(DSMDecorator)

    .add('mapa (todos os ecopontos)', () => (
        <MapComponent />
    ))
    .add('mapa (vidrão)', () => (
        <MapComponent
            display={{ vidrao: true }} />
    ))
    .add('mapa (vidrão + papelao)', () => (
        <MapComponent
            display={{ vidrao: true, papelao: true }} />
    ))
    .add('mapa + filtros', () => (
        <App />
    ));