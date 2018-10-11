import React from 'react'
import { Avatar } from '@material-ui/core';

import totalPointsIcon from '../../../../../img/icones/24x24px/forum/pontos.svg';
import DateUtils from '../../../../../utils/DateUtils';

const messageStyle = {
  border: '2px solid',
  margin: '0px',
  borderColor: 'lightgrey'
}

class ForumMessage extends React.Component {

  render() {
    const { message } = this.props;
    const { '_created': time, '_identity': identity } = message;
    const { name: sender, picture: userIcon } = identity.userProfile;
    const text = message.data.content;


    return (
      <div className="full-width" style={messageStyle}>
        <div className="row margin-top">
          <div className="col-3 col-full-width">
            <Avatar src={userIcon + ''}
              className="avatar-small text-center"
            />
            {/* <div className="row">
              <div className="col-6">
                <img src={totalPointsIcon} alt='' className="icon-normal image-top-bar inline-block" />
              </div>
              <div className="col-6">
                <p className="inline-block text-small"> {100} </p>
              </div>
            </div> */}
          </div>
          <div className="col-9"  >
            <div className="row">
              <div className="col-6 col-full-width">
                <p className="text-bold"> {sender} </p>
              </div>
              <div className="col-6 col-full-width">
                <p className="text-small align-right"> {DateUtils.formatDate(time.toString())} </p>
              </div>
            </div>
            <p className="margin-top-normal"> {text} </p>
          </div>
        </div>

      </div>
    );
  }
}

export default ForumMessage
