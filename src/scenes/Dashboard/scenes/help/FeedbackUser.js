import React from 'react';
import { connect } from "react-redux";

import { withRouter } from 'react-router-dom'

// MUI
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import '../../../../css/index.css'
import { startGroupChatManager } from '../../runtimeHelper';
import TicketResume from './components/TicketResume';
import { setTickets } from '../../../../redux/actions';


class FeedbackUser extends React.Component {

  state = {
    topic: null,
    subject: null,
    message: null,
    snack: false,
    ready: false
  };

  constructor(props) {
    super(props);

    let _this = this;

    if (window.groupChatManager) {
      this.state = {
        ready: true
      }
      this.listenNewTickets();
    }
    else {
      startGroupChatManager().then(function (result) {
        _this.listenNewTickets();
      });
    }
  }

  writeMessage = () => {
    this.props.history.push('/dashboard/help/feedback/new');
  }

  viewTicket = (ticketIndex) => {
    this.props.history.push('/dashboard/help/feedback/chat/' + ticketIndex);
  }

  listenNewTickets() {
    let _this = this;
    window.groupChatManager.onResumeReporter((chatControllers) => {
      let groupChats = Object.values(chatControllers);
      _this.props.setTickets(groupChats);
      _this.setState({ ready: true });
    });
  }

  render() {


    const { tickets } = this.props;

    const listItems = tickets.map((ticket, index) => <li style={{ listStyle: 'none' }} key={"message_" + index}>
      <TicketResume
        ticket={ticket}
        viewTicket={() => this.viewTicket(index)}
      ></TicketResume>
    </li>);

    return (
      <React.Fragment>
        {
          this.state.ready ? (
            <React.Fragment>
              <div className="text-center">
                <p>Mensagens enviadas</p>
              </div>
              {listItems}

              <div className="to-bottom-dashboard">
                <Button
                  variant="raised"
                  color="primary"
                  primary={true}
                  onClick={this.writeMessage}
                  fullWidth={true}
                >
                  enviar mensagem
              </Button>
              </div>
              <Snackbar
                open={this.state.snack}
                message={this.state.snackMessage}
                autoHideDuration={3000}
                onClose={this.handleClose}
              />
            </React.Fragment>

          ) : (<p>Loading group chat manager</p>)
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    tickets: state.tickets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTickets: tickets => dispatch(setTickets(tickets)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeedbackUser));
