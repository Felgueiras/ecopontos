import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import TicketResume from './components/TicketResume';
import { setTickets } from '../../../../redux/actions';

class FeedbackAgent extends React.Component {

  logMessage = '[FeedbackAgent] ';

  state = {
    snack: false
  };

  viewTicket = (ticketIndex) => {
    this.props.history.push('/dashboard/help/feedback/chat/' + ticketIndex);
  }

  render() {

    const { tickets } = this.props;


    // tickets.sort(function (a, b) {
    //   if (a.answered && !b.answered) return 1;
    //   return 0;
    // })

    const listItems = tickets.map((ticket, index) => <li
      style={{ listStyle: 'none' }}
      key={"message_" + index}>
      <TicketResume
        ticket={ticket}
        viewTicket={() => this.viewTicket(index)}
      ></TicketResume>
    </li>);

    return (
      <React.Fragment>
        <React.Fragment>
          {listItems.length > 0 ?
            (listItems) :
            (
              <div className="text-center">
                <p>Atualmente não tem mensagens por responder</p>
              </div>
            )}
        </React.Fragment>
        <Snackbar
          open={this.state.snack}
          message={this.state.snackMessage}
          autoHideDuration={3000}
          onClose={this.handleClose}
        />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeedbackAgent));