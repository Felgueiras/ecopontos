import React from 'react'

import ButtonsSwitch from '../../components/ButtonsSwitch';
import CauseFeed from './components/CauseFeed';
import MyFeed from './components/MyFeed';
import CauseFeedGraph from './components/CauseFeedGraph';



class History extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      content: 0
    };
  }



  buttonSelected = index => {
    this.setState({ content: index });
  };

  render() {

    const historyCategories = ['Pessoal', 'Comunidade'];
    return (
      <React.Fragment>
        <ButtonsSwitch
          buttons={historyCategories}
          buttonSelected={this.buttonSelected}
        />
        {(this.state.content == 0) ? <MyFeed /> : <CauseFeed />}
      </React.Fragment >
    );
  }
}

export default History
