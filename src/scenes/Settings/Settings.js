import React from 'react'
import SettingsStepper from './scenes/SettingsStepper';
import { connect } from "react-redux";
import { withOfflineBehaviour } from '../../utils/HoCs'


import '../../css/index.css';

// create context
export const ThemeContext = React.createContext({
  theme: 'dark',
  toggleTheme: () => { },
});

class Settings extends React.Component {

  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === 'light'
            ? 'dark'
            : 'light',
      }));
    };

    this.state = {
      theme: 'light',
      toggleTheme: this.toggleTheme,
    };

  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <SettingsStepper />
      </ThemeContext.Provider>
    );
  }
}


const mapStateToProps = state => {
  return {
    cause: state.cause,
    wallet: state.wallet,
  };
};

export default withOfflineBehaviour(true)(connect(mapStateToProps, null)(Settings));
