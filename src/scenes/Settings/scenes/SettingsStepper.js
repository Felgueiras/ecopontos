import React from "react";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { withRouter } from "react-router-dom";

// other components
import CauseChallengeSetup from "./CauseChallengeSetup";
import ExternalAccountsSetup from "./ExternalAccountsSetup";
import Signup from '../../Account/scenes/Signup'
import PersonalDataSetup from './PersonalDataSetup'
import { BackIcon } from "../../Dashboard/components/AppBarIcons";

class SettingsStepper extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
    redirect: false
  };

  constructor(props) {
    super(props);
    if (props.step) {
      this.state = {
        stepIndex: props.step,
      };
    }
  }

  handlePrevious = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex - 1
    });

    if (this.state.finished === true) {
      console.log("finished");
    }
  };


  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 1,
      redirect: stepIndex >= 1,
      activeStep: 0
    });

    if (this.state.finished === true) {
      console.log("finished");
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  handleSettingsDone = () => {
    this.props.history.replace("/setup/done/");
  };

  getStepContent() {
    switch (this.state.stepIndex) {
      case 0:
        return <Signup handleNext={this.handleNext} />
      case 1:
        return <PersonalDataSetup handleNext={this.handleNext} />;
      case 2:
        return <CauseChallengeSetup handleNext={this.handleNext} personalData={window.personalData} />;
      case 3:
        return <React.Fragment>
          <ExternalAccountsSetup />
          <div>
            <Button
              variant="raised"
              color="primary"
              onClick={this.handleSettingsDone}
              fullWidth={true}
            >
              concluir
            </Button>
          </div>
        </React.Fragment>;

      default:
        return "";
    }
  }

  render() {
    const { stepIndex } = this.state;
    let appBarTitle;
    const titles = ['Identidade', 'Dados Genéricos', 'Causas', 'Contas externas'];
    appBarTitle = titles[stepIndex];

    const steps = titles.map((step, index) =>
      <Step >
        <StepLabel>{step}</StepLabel>
      </Step>);

    const showBackArrow = stepIndex > 0;
    return (
      <React.Fragment >
        {showBackArrow ? (
          <AppBar position="static" elevation={0}>
            <Toolbar disableGutters={true}>
              <IconButton
                onClick={event => this.handlePrevious()}
                color="inherit"
                aria-label="Menu">
                <BackIcon />
              </IconButton>
              <Typography
                variant="title"
                color="inherit" >
                {appBarTitle}
              </Typography>
            </Toolbar>
          </AppBar>
        ) : (
            <AppBar position="static" elevation={0}>
              <Toolbar disableGutters={true}>
                <Typography
                  variant="title"
                  color="inherit" >
                  {appBarTitle}
                </Typography>
              </Toolbar>
            </AppBar>
          )}
        <div className="content">
          <Stepper activeStep={stepIndex} alternativeLabel>
            {steps}
          </Stepper>
          <div className="margin-bottom">
            {this.getStepContent()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(SettingsStepper);
