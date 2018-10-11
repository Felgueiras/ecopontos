import React from 'react';
import { withRouter } from 'react-router-dom';

const style = {
  part: {
    fontWeight: 'bold'
  },
  header: {
    fontWeight: 'bold',
    fontSize: '20px'
  },
  section: {
    marginBottom: '20px'
  }
}

class FeedbackMessageDetail extends React.Component {

  render() {

    // TODO - fetch storage message by ID
    console.log(this.props.match.params.id);

    let { message } = this.props;
    message = {
      id: 0,
      subject: 'Preciso de ajuda',
      message: 'Como é que eu vejo a lista de check-ins feitos?',
      date: '11/06/2018'
    };
    return (
      <div>
        <div className="text-center margin-normal">
          <p style={style.header}>Mensagem</p>
          <span className="text-smaller">enviada a {message.date}</span>
        </div>
        {/* subject */}
        <div style={style.section}>
          <p style={style.part}>Tópico</p>
          <p>{message.subject}</p>
        </div>
        {/* message */}
        <div style={style.section}>
          <p style={style.part}>Mensagem</p>
          <p>{message.message}</p>
        </div>

      </div>
    );
  }
}

export default withRouter(FeedbackMessageDetail);
