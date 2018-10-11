import React, { Component } from "react";
// redux
import { setLogin } from "../../../redux/actions/index";
import { connect } from "react-redux";

// MUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';


// components
import SocialIcons from '../components/SocialIcons'


// icons
import logo from "../../../img/ilustracoes/onboarding/sharinglisboa_logo_142x56_ondboarding.svg";

import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
  return {
    login: state.login,
    identity: state.identity
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLogin: login => dispatch(setLogin(login))
  };
};



class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      isLogin: true,
      checked: false,
      defaultLogin: this.props.login ? true : false
    };

  }

  afterLogin = () => {
    this.props.history.replace("/dashboard");
  }

  login = () => {
    let _this = this;
    const login = this.props.login;
    let idp;
    if (login.includes('google')) {
      idp = 'google.com';
    }
    if (login.includes('facebook')) {
      idp = 'facebook.com';
    }

    console.log('logging with ', idp);
    window
      .runtime
      .login(idp)
      .then((result) => {
        console.log('result: ', result);
        _this.props.setLogin(result.value);
        _this.setState({ idp: idp });
        window.loggedIn = true;
        _this.afterLogin();
      });
  }



  pickIdentity = () => {
    this.setState({ defaultLogin: false });
  }



  waitRuntime = () => {
    let _this = this;

    setTimeout(() => {

      if (!window.runtime) {
        this.waitRuntime();
        return;
      }
      else {
        this.forceUpdate();
      }


    }, 200);
  };

  render() {

    const login = this.props.login;
    const { defaultLogin } = this.state;

    let idpImage;
    if (defaultLogin) {
      if (login.includes("facebook")) {
        idpImage = (<Icon className="fab fa-facebook fa-2x inline-block icon-normal"></Icon>);
      }
      if (login.includes("google")) {
        idpImage = (<Icon className="fab fa-google fa-2x inline-block icon-normal"></Icon>);
      }
    }

    const loadingInfo = (
      <div className="to-bottom text-center">
        <CircularProgress
          size={40}
          className="margin-top-normal"
        />
        <p className="text-small">A carregar... Por favor, aguarde.</p>
      </div>
    );

    let content = <React.Fragment></React.Fragment>;
    if (!window.runtime) {
      content = loadingInfo;
      this.waitRuntime();
    }
    else {
      if (defaultLogin)
        content = (
          defaultLogin && (
            <div className="text-center to-bottom">
              <Button
                variant="raised"
                color="primary"
                onClick={this.login}
                fullWidth={true}
                className="margin-normal"
              >
                entrar
              </Button>
              <p
                className="text-highlighted"
                onClick={this.pickIdentity}
              >
                Usar outro login social
            </p>
            </div>
          )
        )

    }

    return (
      <React.Fragment>
        <div className="text-center">
          <img src={logo} className="margin-top-normal logo-small" alt="" />
          <p className="text-h1 margin-normal">Entre na aplicação</p>
          {defaultLogin ? (
            <React.Fragment>
              <Avatar
                src={this.props.identity.picture}
                className="avatar-big text-center margin-normal"
              />
              <p className="inline-block">
                {login.split("/")[3]}
              </p>
            </React.Fragment>
          ) : (
              <React.Fragment>
                <p>Com um dos seus logins sociais</p>
                <div className="margin-all">
                  <SocialIcons afterLogin={this.afterLogin} isLogin />
                </div>
              </React.Fragment>
            )}

        </div>
        {content}
      </React.Fragment>
    );
  }
}


const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login);
export default withRouter(LoginScreen);
