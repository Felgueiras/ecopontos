import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Slider from "react-slick";
import PropTypes from 'prop-types';


// mui
import Avatar from '@material-ui/core/Avatar';

// styles
import bonusIcon from '../../../../img/icones/24x24px/lojas/bonus.svg';
import openingIcon from '../../../../img/icones/24x24px/lojas/horario.svg';
import { howManyCollectsAvailableToday } from "../../../../utils/BonusUtils";



class RewardsSlider extends Component {

  constructor(props) {
    super(props);

    const { bonus, bonusID } = props;

    // initial slide
    let initialSlide = bonus.map(function (e) { return e.id; }).indexOf(bonusID);
    if (initialSlide === -1) initialSlide = 0


    this.state = {
      initialSlide: initialSlide
    }


  }

  afterChange = (index) => {
    this.setState({
      initialSlide: index
    })
  }

  render() {
    const { bonus, validateCollect, wallet } = this.props;
    const { initialSlide } = this.state;

    const selectedBonus = bonus[initialSlide];


    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: initialSlide,
      customPaging: i => (
        <div className="dot-div">
          <span className="dot"></span>
        </div>
      )
    };

    const availabilityStyle = {
      position: 'absolute',
      left: '50%',
      marginTop: '-36px',
      marginLeft: '36px',
      fontWeight: 'bold'
    };

    const listItems = bonus.map((bonus, index) => <li key={"bonus_" + index}>
      <div className="text-center margin-top-normal">
        <div>
          <Avatar src={bonus.icon} className="avatar-big text-center" />
          {selectedBonus.constraints && (
            <p style={availabilityStyle} className="text-small">{selectedBonus.constraints.times} por dia</p>
          )}
        </div>
        <p> {bonus.description} </p>
        <p className="text-small"> Válido até {bonus.expires}</p>

      </div>
    </li>);


    return (
      <React.Fragment>
        <Slider {...settings}
          afterChange={this.afterChange}>
          {listItems}
        </Slider>
        {validateCollect(selectedBonus)}
      </React.Fragment>
    )
  }
}

RewardsSlider.propTypes = {
  bonus: PropTypes.array.isRequired,
  bonusID: PropTypes.string.isRequired
}


class ShopInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      view: this.props.showBonus === true ? 'bonus' : 'checkin'
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.showBonus !== prevProps.showBonus) {
      this.setState({ view: this.props.showBonus === true ? 'bonus' : 'checkin' })
    }
  }



  getSchedule = shop => {
    const openingHours = shop["opening-hours"];
    let workDays = "2ª a dom";
    let time = openingHours["monday"].replace(/[[\]']/g, "");
    return `${workDays}, ${time}`;
  };

  render() {
    const { shop, bonus: shopBonuses, validateCheckin } = this.props;


    return (
      <React.Fragment>
        {this.state.view === 'checkin' ? (
          <React.Fragment>
            {this.props.name === true &&
              (<p className="text-highlighted">{shop.name}</p>)
            }
            {/* schedule */}
            <div className="shop-timetable text-small">
              <img src={openingIcon} alt='' className="inline-block icon-small" />
              {this.getSchedule(shop)}
            </div>
            {/* description */}
            <p className="shop-info text-small">{shop.description}</p>
            {/* available bonuses */}
            {shopBonuses.length > 0 &&
              (
                <div className="margin-normal" onClick={() => this.setState({ view: 'rewards' })}>
                  <img src={bonusIcon} alt='' className="inline-block icon-small" />
                  <p className="text-highlighted text-small inline-block"  >Tem {shopBonuses.length} bónus por usufruir</p>
                </div>
              )
            }
            {validateCheckin !== undefined && (validateCheckin())}
          </React.Fragment>
        ) : (
            <React.Fragment>
              <RewardsSlider
                bonus={shopBonuses}
                bonusID={this.props.bonusID}
                wallet={this.props.wallet}
                validateCollect={this.props.validateCollect}
              />
            </React.Fragment>
          )}


      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    wallet: state.wallet
  };
};

export default connect(mapStateToProps)(withRouter(ShopInfo));
