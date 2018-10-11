import React from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from "react-redux";
import { reset } from '../../redux/actions/index'

import Login from '../Account/scenes/Login';
import FeedbackDialog from '../Dashboard/components/FeedbackDialog';

class ResetAccount extends React.Component {

  state = {
    open: true
  }
  constructor(props) {
    super(props);
    // reset redux state
    this.props.reset();
    // delete wallet
    window.wallet.removeWallet();
  }

  goToSplash = () => {
    this.props.history.replace("/");
  }

  render() {

    const { open } = this.state;
    return (
      <div className="container-1 text-center">
        <Login />
        <FeedbackDialog
          close={() => this.setState({ open: false })}
          open={open}
          main={"Dados apagados com sucesso"}
          message={"Ao voltar a entrar, o seu registo será criado novamente."}
          buttonLabel={"Entendido"}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reset: () => dispatch(reset()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(ResetAccount));
