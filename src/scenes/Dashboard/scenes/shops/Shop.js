import React from "react";
// Material UI
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";

import CheckInDialog from "./CheckInDialog";
import ShopInfo from './ShopInfo'

class Shop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  selectShop = shop => e => {
    if(this.props.checkNetwork())
        this.props.history.push("/dashboard/map/" + shop.id);
  };


  close = () => {
    this.setState({ open: false });
  };


  render() {
    const shop = this.props.shop;
    const shopBonuses = this.props.bonus.filter(bonus => bonus.spotID === shop.id);
    return (
      <div className="margin-top-normal" onClick={this.selectShop(shop)}>
        <div className="row">
          {/* image */}
          <div className="col-3">
            <Avatar src={shop.picture} className="avatar-big text-center" />
          </div>
          {/* info */}
          <div className="col-9"  >
            <ShopInfo shop={shop} name={true} bonus={shopBonuses} position={this.props.position} />
          </div>
        </div>
        <CheckInDialog shop={shop} open={this.state.open} close={this.close} />
        <Divider />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bonus: state.bonus,
    position: state.position
  };
};

export default connect(mapStateToProps)(withRouter(Shop));
