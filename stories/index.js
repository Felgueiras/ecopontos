import { MuiThemeProvider } from '@material-ui/core/styles';
import { withKnobs, button } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import React, { Component } from 'react';



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
import EcopontoInfo, { EPS } from '../src/components/EcopontoInfo';
import ResultsList from '../src/components/ResultsList';
import Search from '../src/components/Search';
import Report from '../src/components/Report';
import App from '../src/App';
import EcopontoDialog from '../src/components/EcopontoDialog';
import FetchEcopontos from '../src/components/FetchEcopontos';


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
            ecoponto={{
                lat: "-8.442374726502189",
                lng: "40.577189499853596",
                propriedad: "ERSUC",
                vidrao: true,
                papelao: true,
                embalao: true,
                lixo_geral: false,
                oleao: false,
                pilhao: false,
                dep_roupa: false,
            }}
        />
    ))
    .add('ecoponto dialog', () => (
        <EcopontoDialog
            ecoponto={initialState.ecopontos[0]}
            open={open}
        // close={this.close}
        />
    ));






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