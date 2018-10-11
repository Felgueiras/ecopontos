import React from 'react'



class CauseChallengeSetup extends React.Component {

  render() {
    return (
      <div>
        <img src={this.props.participant.thumbnail} alt="Thumbnail"></img>
        <p>{this.props.participant.name}</p>

      </div>
    );
  }
}

export default CauseChallengeSetup
