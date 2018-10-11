import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from "../redux/store/index";

// components
import Reward from '../scenes/Dashboard/components/Reward';

describe("Reward", () => {
  let props;
  let mountedRewards;
  const reward = () => {
    if (!mountedRewards) {
      mountedRewards = mount(
        <Provider store={store}>
          {/* <MuiThemeProvider> */}
          <Reward {...props} />
          {/* </MuiThemeProvider> */}
        </Provider>
      );
    }
    return mountedRewards;
  }

  beforeEach(() => {
    props = {
      reward: {
        icon: "./img/bird.jpg",
        name: "Croaissant",
        shop: "Ti Manel shop",
        cost: 100
      }
    };
    mountedRewards = undefined;
  });

  // All tests will go here
  describe("Reward component", () => {

    it("always renders a div", () => {
      const divs = reward().find("div");
      expect(divs.length).toBeGreaterThan(0);
    });


    it("opens dialog when clicked", () => {
      const div = reward().find("div").first();
      // click div
      div.simulate('click');
      const dialog = reward().find("Dialog");
      // check props
      expect(dialog.props().open).toEqual(true);
    });


    it("Dialog is closed by default", () => {
      const dialog = reward().find("Dialog");
      // check props
      expect(dialog.props().open).toEqual(false);
    });

  });
});
