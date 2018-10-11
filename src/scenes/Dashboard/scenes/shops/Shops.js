import React from 'react'
// material UI components other components
import Shop from './Shop';
// redux
import { connect } from "react-redux";

import { withOfflineBehaviour, withOfflineBehaviourSingleElement} from '../../../../utils/HoCs'

const mapStateToProps = state => {
  return { shops: state.shops };
};

class ConnectedLocalShops extends React.Component {

  

  render() {

    const ShopWithOfflineBehaviour = withOfflineBehaviourSingleElement(Shop);

    const {shops} = this.props;

    // sort shops by name
    shops.sort(function (a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    })

    const listItems = shops.map((shop, index) => <li key={"shop_" + index}>
      <ShopWithOfflineBehaviour shop={shop}></ShopWithOfflineBehaviour>
    </li>);
    return (
      <React.Fragment>
        <ul className="margin-bottom">{listItems}</ul>
      </React.Fragment>
    );
  }
}

const Shops = connect(mapStateToProps)(ConnectedLocalShops);

export default Shops;
