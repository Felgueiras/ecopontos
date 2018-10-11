import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Button, Snackbar } from '@material-ui/core';
import { StringUtils } from '../../../../../utils/StringUtils';
import ConfirmationDialog from '../../../components/ConfirmationDialog';

export default class CloseTicket extends Component {

    state = {
        snack: false,
        snackMessage: StringUtils.ticketWasClosed,
        openDialog: false
    }

    closeTicketPrompt = () => {
        this.setState({ openDialog: true });
    }

    handleChangeMessage = event => {

        const message = event.target.value;
        this.setState({ message: message });
    }

    render() {

        const { openDialog } = this.state;

        const closeTicket = (toClose = false) => {

            if (toClose) {
                this.setState({ snack: true });
                this.props.closeTicket();
            }
            this.setState({ openDialog: false });

        };

        return (
            <React.Fragment>

                <Button
                    variant="raised"
                    color="primary"
                    onClick={this.closeTicketPrompt}
                    fullWidth={true}
                >
                    Fechar ticket
                </Button>
                <ConfirmationDialog
                    showNegative
                    // image={image}
                    close={closeTicket}
                    open={openDialog}
                    main={StringUtils.ticketClose}
                    message={StringUtils.ticketShouldBeClosed}
                    positiveAction={StringUtils.ticketClose}
                    negativeAction={StringUtils.cancel}
                />
                <Snackbar
                    open={this.state.snack}
                    message={this.state.snackMessage}
                    autoHideDuration={4000}
                    onClose={() => this.setState({ snack: false })}
                />
            </React.Fragment>
        )
    }
}

CloseTicket.propTypes = {
    closeTicket: PropTypes.func.isRequired
}