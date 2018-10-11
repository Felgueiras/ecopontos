import React from 'react';

// MUI
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { CRMaddressTickets } from '../../runtimeHelper';


class FeedbackNewMessage extends React.Component {

  state = {
    topic: null,
    subject: null,
    message: null,
    snack: false,
    name: 'hai',
  };

  checkTextFields = () => {

    const { topic, message } = this.state;

    if (topic === null) {
      this.setState({
        snack: true,
        snackMessage: 'Tem de selecionar um tópico'
      });
      return;

    }
    if (message === null) {
      this.setState({
        snack: true,
        snackMessage: 'Tem de escrever uma mensagem'
      });
      return;
    }
    const { groupChatManager } = window;
    groupChatManager.myIdentity().then(function (identity) {
      groupChatManager.create(`${topic}-${message}`, [{ user: CRMaddressTickets }]);
    });

  }

  handleClose = () => {
    this.setState({ snack: false });
  };

  handleChangeTopic = event => {
    this.setState({ topic: event.target.value });
  };

  handleChangeMessage = event => {
    this.setState({ message: event.target.value });
  };


  render() {

    return (
      <React.Fragment>
        <b className="text-center">Deixe aqui a sua dúvida, tentaremos esclarecê-la o mais rápido possível</b>
        <FormControl fullWidth>
          <InputLabel htmlFor="age-simple">Tópico</InputLabel>
          <Select
            value={this.state.topic}
            onChange={this.handleChangeTopic}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value={"problemas técnicos"}>problemas técnicos</MenuItem>
            <MenuItem value={"sugestões"}>sugestões</MenuItem>
            <MenuItem value={"quizzes"}>quizzes</MenuItem>
            <MenuItem value={"lojas ou bónus"}>lojas ou bónus</MenuItem>
            <MenuItem value={"causas (escolas)"}>causas (escolas)</MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormControl fullWidth>
          <InputLabel htmlFor="name-simple">Mensagem</InputLabel>
          <Input
            rows="6"
            multiline={true}
            id="name-simple"
            value={this.state.message}
            onChange={this.handleChangeMessage} />
        </FormControl>


        <div className="to-bottom-dashboard">
          <Button
            variant="raised"
            color="primary"
            primary={true}
            onClick={this.checkTextFields}
            fullWidth={true}
          >
            enviar mensagem
          </Button>
        </div>
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

export default FeedbackNewMessage;
