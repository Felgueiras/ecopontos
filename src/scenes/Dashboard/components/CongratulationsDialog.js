import React from "react";
import PropTypes from 'prop-types';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import trophyIcon from '../../../img/ilustracoes/parabens/parabens_ganhou_pontos.svg';
import errorIcon from '../../../img/emoticon/sad_face.svg'


class CongratulationsDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open
    };
  }

  closeDialog = () => {
    this.setState({ open: false });
    this.props.close();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return { open: nextProps.open };
  }

  handleRequestCloseDialog = () => {
    this.props.close();
  };

  render() {

    const { main, error, message, buttonLabel, otherAction } = this.props;

    let image = this.props.image ? this.props.image : trophyIcon;
    return (
      <div>
        <Dialog
          fullWidth={true}
          open={this.state.open}
          onClose={this.handleRequestCloseDialog}
          className="text-center"
        >
          <DialogContent>
            {error === true ?
              (<img src={errorIcon} alt='' className="margin-normal image-normal" />)
              : (<img src={image} alt='' className="margin-normal image-normal" />)
            }
            <strong>{main}</strong><br />
            <p className="" dangerouslySetInnerHTML={{ __html: message }}></p><br />
            {/* <p>Pode usufruir de bónus se tiver ultrapassado x desde a última vez q consumiu</p> */}
            <Button
              variant="raised"
              color="primary"
              fullWidth={true}
              onClick={this.closeDialog}
            >
              {buttonLabel}
            </Button>
            {otherAction && (
              <p
                className="text-highlighted"
              // onClick={close => props.close(false)}
              >
                {otherAction}</p>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

CongratulationsDialog.propTypes = {
  main: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  otherAction: PropTypes.func

}

export default CongratulationsDialog;
