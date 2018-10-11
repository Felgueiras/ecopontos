import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { FormControl, InputLabel, Input, Button, Snackbar } from '@material-ui/core';
import { StringUtils } from '../../../../../utils/StringUtils';

export default class SendMessage extends Component {

    state = {
        message: '',
        snack: false
    }

    sendMessage = () => {
        const { message } = this.state;
        this.setState(
            {
                message: '',
                // snack: true
            })
        this.props.newMessage(message)
    }

    handleChangeMessage = event => {

        const message = event.target.value;
        this.setState({ message: message });
    }

    render() {

        const { message } = this.state;
        return (
            <React.Fragment>
                <FormControl fullWidth>
                    <InputLabel htmlFor="name-simple">Mensagem</InputLabel>
                    <Input
                        rows="2"
                        multiline={true}
                        id="name-simple"
                        value={this.state.message}
                        onChange={this.handleChangeMessage} />
                </FormControl>
                <Button
                    disabled={message === ''}
                    variant="raised"
                    color="primary"
                    onClick={this.sendMessage}
                    fullWidth={true}
                >
                    {StringUtils.sendMessage}
                </Button>
                <Snackbar
                    open={this.state.snack}
                    message={'Mensagem enviada com sucesso'}
                    autoHideDuration={4000}
                    onClose={() => this.setState({ snack: false })}
                />
            </React.Fragment>
        )
    }
}

SendMessage.propTypes = {
    newMessage: PropTypes.func.isRequired
}