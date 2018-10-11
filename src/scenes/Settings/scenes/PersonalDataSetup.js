import React from "react";
// redux
import { connect } from "react-redux";

// MUI
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import Snackbar from '@material-ui/core/Snackbar';


class PersonalDataSetup extends React.Component {



  constructor(props) {
    super(props);

    const personalData = window.personalData;

    this.state = {
      snack: false,
      snackMessage: ''
    };
    if (personalData) {
      this.state = {
        age: personalData.ageRange,
        gender: personalData.gender === 'm' ? 'Masculino' : 'Feminino',
        residence: personalData.livesInLisbon === true ? 'Sim' : 'Não',
        work: personalData.worksInLisbon === true ? 'Sim' : 'Não',
      };
    }

  }


  checkData = () => {

    if (!this.state.age) {
      this.setState({
        snack: true,
        snackMessage: 'Tem de selecionar a sua idade'
      });
      return;
    }

    if (!this.state.gender) {
      this.setState({
        snack: true,
        snackMessage: 'Tem de selecionar o género'
      });
      return;
    }

    if (!this.state.residence) {
      this.setState({
        snack: true,
        snackMessage: 'Tem de selecionar o local de residência'
      });
      return;
    }

    if (!this.state.work) {
      this.setState({
        snack: true,
        snackMessage: 'Tem de selecionar o local de trabalho'
      });
      return;
    }

    window.personalData = {
      ageRange: this.state.age,
      gender: (this.state.gender === 'Masculino') ? 'm' : 'f',
      livesInLisbon: this.state.residence === 'Sim' ? true : false,
      worksInLisbon: this.state.work === 'Sim' ? true : false
    };
    this.props.handleNext();
  }

  handleRequestClose = () => {
    this.setState({
      snack: false,
    });
  };



  handleSetAge = event => {
    const selection = event.target.value;
    this.setState({ age: selection });
  };

  handleSetGender = event => {
    const selection = event.target.value;
    this.setState({ gender: selection });
  };

  handleSetResidence = event => {
    const selection = event.target.value;
    this.setState({ residence: selection });
  };

  handleSetWork = event => {
    const selection = event.target.value;
    this.setState({ work: selection });
  };


  render() {

    const ageRanges = ["<18", "18-30", "31-55", ">55"];
    const genders = ["Masculino", "Feminino"];


    return (
      <React.Fragment >
        <div className="text-center margin-normal">
          <p className="text-h2">Fale-nos um pouco de si </p>
          <p className="text-smaller">(preenchimento obrigatório, estes dados serão processados duma forma anónima)</p>
        </div >
        {/* age */}
        < div className="bg-gray">
          <p className="text-bold">Faixa etária</p>
          {ageRanges.map((range, index) =>
            // Only do this if items have no stable IDs
            <React.Fragment
              key={"agerange_" + index}
            >
              <Radio
                checked={this.state.age === range}
                onChange={this.handleSetAge}
                value={range}
              />
              {range}
            </React.Fragment>
          )}
        </div >
        <div className="bg-gray">
          <p className="text-bold">Género</p>
          {genders.map((range, index) =>
            <React.Fragment
              key={"genders_" + index}
            >
              <Radio
                checked={this.state.gender === range}
                onChange={this.handleSetGender}
                value={range}
              />
              {range}
            </React.Fragment>
          )}
        </div>
        <div className="bg-gray">
          <p className="text-bold">Vive em Lisboa?</p>
          {["Sim", "Não"].map((value, index) =>
            <React.Fragment key={"lives_" + index}>
              <Radio
                checked={this.state.residence === value}
                onChange={this.handleSetResidence}
                value={value}
              />
              {value}
            </React.Fragment>
          )}
        </div>
        <div className="bg-gray">
          <p className="text-bold">Trabalha em Lisboa?</p>
          {["Sim", "Não"].map((value, index) =>
            <React.Fragment key={"works_" + index}>
              <Radio
                checked={this.state.work === value}
                onChange={this.handleSetWork}
                value={value}
              />
              {value}
            </React.Fragment>
          )}
        </div>

        <div
        // className="to-bottom"
        >
          <Button
            variant="raised"
            color="primary"
            onClick={this.checkData}
            fullWidth={true}
          >
            passo seguinte
          </Button>
        </div>
        <Snackbar
          open={this.state.snack}
          message={this.state.snackMessage}
          autoHideDuration={4000}
          onClose={this.handleRequestClose}
        />
      </React.Fragment >
    );
  }
}



const mapStateToProps = state => {
  return {
    wallet: state.wallet
  };
};

export default connect(mapStateToProps, null)(PersonalDataSetup);
