import { MuiThemeProvider } from '@material-ui/core/styles';
import { withKnobs, button } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import React from 'react';

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
import { ecopontos } from '../src/components/ecopontos';


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


export default class SearchAsChild extends React.Component {

    state = {
        display: {}
    }

    render() {
        return (
            <div>
                <Search handle={(filter) => this.setState({ display: filter })} />
                <MapComponent display={this.state.display} />
            </div>
        )
    }
}

storiesOf('Ecopontos', module)
    .addDecorator(DSMDecorator)
    // .add('lista de ecopontos', () => (
    //     <ResultsList />
    // ))
    .add('reportar problema', () => (
        <Report
            ecoponto={ecopontos[0]} />
    ))
    .add('pesquisa', () => (
        <Search />
    ));
    // .add('info sobre ecopontos', () => (
    //     <EcopontoInfo
    //         ecoponto={ecopontos[0]}
    //     />
    // ));


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
        <SearchAsChild />
    ))