import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { List, ListItem, ListItemText } from '@material-ui/core';
import SendMessage from './components/SendMessage';
import TicketsAPI, { DSMMessage } from './TicketsAPI';
import CloseTicket from './components/CloseTicket';

class FeedbackChat extends React.Component {

  constructor(props) {
    super(props);

    const ticketIndex = Number(this.props.match.params.id);
    const ticket = this.props.tickets[ticketIndex];

    let _this = this;

    function receivedMessageCallback(message) {
      let messagesList = _this.state.messages;
      messagesList.push(TicketsAPI.parseNewMessage(message))
      _this.setState({ messsages: messagesList });
      message.value.contents
    }
    ticket.onMessage(receivedMessageCallback)

    const messages = TicketsAPI.getMessages(ticket.messages);

    this.state = {
      messages: messages,
      ticket: ticket
    }
  }

  getStyle(sender) {
    switch (sender) {
      case 'other':
        return {
          textAlign: 'left'
        }
      case 'me':
        return {
          textAlign: 'right'
        }
      default:
        break;
    }
  }


  sendMessage = (ticket, identity) => (message) => {
    let _this = this;
    console.log('New message: ', message, ticket);
    ticket.send(message, identity)
      .then(function (result) {
        let messagesList = _this.state.messages;
        messagesList.push(new DSMMessage('me', message))
        _this.setState({ messsages: messagesList });
      })
      .catch(function (rej) {
        //here when you reject the promise
        console.log(rej);
      });
  }

  closeTicket = (ticket) => () => {
    let _this = this;
    ticket.close()
      .then(function (result) {
        _this.props.history.goBack();
      })
      .catch(function (rej) {
        console.log(rej);
      });
  }

  render() {

    const { messages } = this.state;
    const listItems = messages.map((message, index) =>
      <ListItem
        style={this.getStyle(message.sender)}
        key={"drawer_action_" + index} >
        <ListItemText
          primary={message.text} />
      </ListItem >
    );

    const topBarHeight = window.jQuery(".top-bar").height();
    const bottomBarHeight = window.jQuery(".bottom-bar").height();
    const screenHeight = window.jQuery("#root").height();
    let mapHeight = screenHeight - topBarHeight - bottomBarHeight;

    const listStyle = {
      height: `${mapHeight * 0.8}px`,
      overflow: 'hidden',
      overflowY: 'scroll'
    }

    return (
      <React.Fragment>
        <List style={listStyle}>
          {listItems}
        </List>
        <div className="to-bottom-dashboard">
          <div style={{ marginBottom: '10px' }}>
            <SendMessage
              newMessage={this.sendMessage(this.state.ticket, this.props.identity)} />
          </div>
          <CloseTicket
            closeTicket={this.closeTicket(this.state.ticket)}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    tickets: state.tickets,
    identity: state.identity,
  };
};

export default withRouter(connect(mapStateToProps, null)(FeedbackChat));