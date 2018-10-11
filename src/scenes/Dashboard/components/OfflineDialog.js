import React from "react";
import FeedbackDialog from "./FeedbackDialog";

import errorImage from '../../../img/emoticon/sad_face.svg'
import { StringUtils } from "../../../utils/StringUtils";


class OfflineDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return { open: nextProps.open };
  }

  render() {
    return (
      <React.Fragment>
        <FeedbackDialog
          close={this.props.close}
          open={this.props.open}
          main={"Sem ligação"}
          message={"Algumas funcionalidades poderão estar limitadas"}
          buttonLabel={StringUtils.appOffline}
          image={errorImage}
          waiting={this.props.blocking}
        />
      </React.Fragment>
    );
  }
}

export default OfflineDialog;
