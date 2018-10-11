import React from 'react'
import { List, ListItem, Snackbar } from '@material-ui/core';
import ForumMessage from './components/ForumMessage';
import { startGroupChatManager } from '../../runtimeHelper';
import TicketsAPI from '../help/TicketsAPI';
import SendMessage from '../help/components/SendMessage';

class Forum extends React.Component {


  state = {
    messages: [],
    ready: false,
    ticket: {}
  }

  constructor(props) {
    super(props);

    let _this = this;

    if (window.groupChatManager) {
      this.state = {
        ready: true
      }
      this.getForumMessages();
    }
    else {
      startGroupChatManager().then(function () {
        _this.setState({ ready: true });
        _this.getForumMessages();
      });
    }
  }

  showMessages = (ticket) => {
    let _this = this;
    function receivedMessageCallback(message) {
      let messagesList = _this.state.messages;
      messagesList.push(message.child);
      _this.setState({ messages: messagesList });
    }
    ticket.onMessage(receivedMessageCallback)

    const messages = TicketsAPI.getMessages(ticket.messages, true);
    this.setState({ messages: messages });
  }

  getForumMessages() {
    let _this = this;
    window.groupChatManager.onResumeObserver((chatControllers) => {
      const commKey = Object.keys(chatControllers).filter(key => key.startsWith('comm:'))[0];
      const ticket = chatControllers[commKey];
      _this.showMessages(ticket);
      _this.setState({ ticket: ticket })
    });
  }

  handleChange = event => {
    const message = event.target.value;
    this.setState({ message: message });
  };

  handleCloseSnackbar = () => {
    this.setState({ snack: false });
  };

  sendMessage = () => (message) => {
    let _this = this;
    this.state.ticket.send(message, this.props.identity)
      .then(function (result) {
        let messagesList = _this.state.messages;
        result['_identity'] = result.identity;
        result['_created'] = new Date();
        result.data = result.value;
        messagesList.push(result);
        _this.setState({ messsages: messagesList });
      })
      .catch(function (rej) {
        console.log(rej);
      });
  }

  render() {

    const { messages } = this.state;
    const messagesList = [...messages].reverse().map((message, index) =>
      <ListItem key={"forum_message_" + index}>
        <ForumMessage
          message={message} />
      </ListItem>
    );

    const topBarHeight = window.jQuery(".top-bar").height();
    const bottomBarHeight = window.jQuery(".bottom-bar").height();
    const screenHeight = window.jQuery("#root").height();
    let mapHeight = screenHeight - topBarHeight - bottomBarHeight;

    const listStyle = {
      height: `${mapHeight * 0.7}px`,
      overflow: 'hidden',
      overflowY: 'scroll'
    }

    return (
      <React.Fragment>
        {
          this.state.ready ? (
            <React.Fragment>
              <List style={listStyle}>
                {messagesList}
              </List>
              <div className="to-bottom-dashboard">
                <SendMessage
                  newMessage={this.sendMessage()}
                />
              </div>
              <Snackbar
                open={this.state.snack}
                message={this.state.snackMessage}
                autoHideDuration={4000}
                onClose={this.handleCloseSnackbar}
              />
            </React.Fragment>

          ) : (<p>Loading forum...</p>)
        }
      </React.Fragment >
    );
  }
}

export default Forum;
