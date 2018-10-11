import React from "react";
import PropTypes from 'prop-types';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { DialogContentText } from "@material-ui/core";

const ConfirmationDialog = (props) => {
  const { thirdAction, showNegative, negativeAction } = props;
  let positiveText = props.positiveAction ? props.positiveAction : 'Sim';
  let negativeText = negativeAction ? negativeAction : 'Não';

  return (
    <div>
      <Dialog
        fullWidth={true}
        open={props.open}
        className="text-center"
      >
        <DialogContent >
          {props.image && (
            <img src={props.image} className="image-normal margin-normal" />
          )}
          <DialogContentText
            className="text-h1 margin-normal"
            style={{ color: 'black' }}>
            {props.main}
          </DialogContentText>
          <p className="" dangerouslySetInnerHTML={{ __html: props.message }}></p><br />

          <Button
            color="primary"
            variant="raised"
            fullWidth={true}
            onClick={close => props.close(true)}
            className="margin-normal"
          >
            {positiveText}
          </Button>
          {thirdAction && (
            <Button
              color="primary"
              variant="raised"
              fullWidth={true}
              onClick={close => props.close(true)}
              className="margin-normal"
            >
              {thirdAction}
            </Button>
          )}
          {negativeAction && (showNegative || props.negativeAction) !== '' && negativeText !== positiveText && (


            <p
              className="text-highlighted"
              onClick={close => props.close(false)}>{negativeText}</p>
          )}

        </DialogContent>
      </Dialog>
    </div>
  );
}

ConfirmationDialog.propTypes = {
  main: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  positiveAction: PropTypes.string.isRequired,
  negativeAction: PropTypes.string.isRequired,
  thirdAction: PropTypes.string,
  image: PropTypes.node
}
export default ConfirmationDialog
