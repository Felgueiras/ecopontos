import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from "../redux/store/index";
// components
import Rewards from '../scenes/Dashboard/scenes/Rewards';
import Reward from '../scenes/Dashboard/components/Reward';

describe("Rewards", () => {
  let mountedRewards;
  const rewards = () => {
    if (!mountedRewards) {
      mountedRewards = mount(
        <Provider store={store}><Rewards/></Provider>
      );
    }
    return mountedRewards;
  }

  beforeEach(() => {
    // props = {
    //   rewards: undefined
    // };
    mountedRewards = undefined;
  });

  // All tests will go here
  describe("Rewards component", () => {
    it.skip("always renders a div", () => {
      const divs = rewards().find("div");
      expect(divs.length).toBeGreaterThan(0);
    });

    it.skip("renders Reward children", () => {
      // console.log(rewards().find(Rewards).props());
      expect(rewards().find(Reward).length).toBe(0);
    });

    it("does not receive any props", () => {
      const rw = rewards().find(Rewards);
      expect(Object.keys(rw.props()).length).toBe(0);
    });

  });
});
