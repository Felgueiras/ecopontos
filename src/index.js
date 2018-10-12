import React from 'react';
import ReactDOM from 'react-dom';

// redux
import { connect } from "react-redux";
import { setConnectivity } from "./redux/actions/index";
import { withRouter } from 'react-router-dom'

// MUI
import theme from './constants/theme'
import { MuiThemeProvider as NewMuiThemeProvider } from '@material-ui/core/styles';


// redux
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store/index';
import { PersistGate } from 'redux-persist/integration/react';


// CSS
import './css/index.css';



import {
  HashRouter,
  Switch,
  Route,
} from 'react-router-dom'
import Report from './components/Report';
import Navigate from './components/Navigate';
import App from './App';


const Main = (logged) => (
  <main>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/report/:id" component={Report} />
      <Route path="/navigate/:id" component={Navigate} />
    </Switch>
  </main>
);


class MainElement extends React.Component {


  render() {
    return (
      <React.Fragment>
        <Main />
      </React.Fragment>
    )
  }
}



const mapDispatchToProps = dispatch => {
  return {
    setConnectivity: connectivity => dispatch(setConnectivity(connectivity))

  };
};

const mapStateToProps = state => {
  return { logged: state.logged };
};

// window.Raven.config('https://dab4dcf06a724147ab3b31fc2daaa9b1@sentry.io/1250497').install()

const MainElementWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(MainElement));

ReactDOM.render((
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        <div className="main-container">
          <NewMuiThemeProvider theme={theme}>
            <MainElementWithRouter />
          </NewMuiThemeProvider>
        </div>
      </HashRouter>
    </PersistGate>
  </Provider>

), document.getElementById('root'))
