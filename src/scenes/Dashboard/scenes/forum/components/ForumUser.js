import React from "react";
// Material UI
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";

import totalPointsIcon from '../../../../../img/icones/32x32px/header/total_pontos.svg';
import rankingIcon from '../../../../../img/icones/24x24px/forum/posicao.svg';

import online from '../../../../../img/icones/16x16px/forum/online.svg';
import offline from '../../../../../img/icones/16x16px/forum/offline.svg';


import { Badge, withStyles } from "@material-ui/core";

class ForumUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  selectShop = shop => e => {
    if (this.props.checkNetwork())
      this.props.history.push("/dashboard/map/" + shop.id);
  };


  close = () => {
    this.setState({ open: false });
  };


  render() {
    const { user, classes } = this.props;
    const { name, image, ranking, tokens, status } = user;

    const statusIcon = (status === 'online') ?
      <Avatar src={online}
        classes={{ root: classes.badgeItem }}
      /> :
      <Avatar src={offline}
        classes={{ root: classes.badgeItem }}
      />;

    // const shopBonuses = this.props.bonus.filter(bonus => bonus.spotID === shop.id);
    return (
      <div className="full-width" onClick={this.selectShop(user)}>
        <div className="row">
          {/* image */}
          <div className="col-3">
            {/* <Avatar src={image} className="avatar-big text-center" /> */}
            <Badge badgeContent={statusIcon}
              classes={{ colorPrimary: classes.colorPrimary }}
              color="primary">
              <Avatar src={image + ''}
                className="avatar-small"
              />
            </Badge>
          </div>
          {/* info */}
          <div className="col-9"  >
            <p className="text-bold"> {name} </p>
            <div className="row">
              <div className="col-6">
                <img src={totalPointsIcon} alt='' className="icon-normal image-top-bar inline-block" />
                <p className="inline-block"> {tokens} </p>
              </div>
              <div className="col-6">
                <img src={rankingIcon} alt='' className="icon-normal image-top-bar inline-block" />
                <p className="inline-block"> {ranking} </p>
              </div>
            </div>
          </div>
        </div>
        
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

const styles = theme => ({
  badgeItem: {
    width: 12,
    height: 12
  },
  colorPrimary: {
    marginTop: 10,
    marginRight: 7,
    width: 12,
    height: 12,
    zIndex: 0
  }
});

export default withStyles(styles)(connect(mapStateToProps)(withRouter(ForumUser)));
