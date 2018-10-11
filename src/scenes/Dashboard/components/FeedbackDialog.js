import React from "react";
import PropTypes from 'prop-types';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';




class FeedbackDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open
    };
  }

  closeDialog = () => {
    console.log("closing dialog");
    this.setState({ open: false });
    this.props.close();
  };

  static getDerivedStateFromProps(nextProps) {
    return { open: nextProps.open };
  }

  handleRequestCloseDialog = () => {
    this.props.close();
  };


  render() {
    const {main, message, image, waiting, buttonLabel} = this.props;

    return (
      <div>
        <Dialog
          fullWidth={true}
          open={this.state.open}
          onClose={this.handleRequestCloseDialog}
          className="text-center"
        >
          <DialogContent>
            <img src={image} alt='' className="margin-normal image-normal" />
            {main && (<p className="text-h1">{main}</p>)}
            <p className="margin-big" dangerouslySetInnerHTML={{ __html: message }}></p><br />

            {waiting === true ? (
              <CircularProgress
                size={40}
                // className="margin-top-normal"
              />
            ) : (<Button
              fullWidth={true}
              color="primary"
              variant="raised"
              onClick={this.closeDialog}
            >
              {buttonLabel}
            </Button>)}
            
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

FeedbackDialog.propTypes = {
  image: PropTypes.any,
  main: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired
}

export default FeedbackDialog;
