import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withOfflineBehaviourSingleElement } from '../../../../utils/HoCs'


// material ui
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

// other components
import ButtonsSwitch from '../../components/ButtonsSwitch';
import searchIcon from '../../../../img/icones/24x24px/bonus/pesquisa.svg';
import ShopUtils from '../../../../utils/ShopUtils';
import Bonus from './components/Bonus';
import { bonusAvailableForDate, isCauseBonus, causeBonus } from '../../../../utils/BonusUtils'

import bonusCreditIcon from '../../../../img/ilustracoes/aprender/total_pontos_ganhos.svg';


const mapStateToProps = state => {
  return {
    bonus: state.bonus,
    shops: state.shops,
    position: state.position,
    wallet: state.wallet,
    transactions: state.wallet.transactions,
    bonusCredit: state.wallet['bonus-credit']
  };
};

class BonusList extends React.Component {

  state = {
    search: null,
    order: 0
  };

  constructor(props) {
    super(props);

    if (this.props.position) {
      this.state = {
        position: this.props.position,
        order: 0
      };
    }
    else {
      this.state = {
        position: {
          lat: 0,
          lng: 0
        },
        order: 0
      };
    }

    this.shopUtils = new ShopUtils(this.props.shops);
  }

  buttonSelected = index => {
    this.setState({ order: index });
  };


  handleSearch = name => event => {
    this.setState({
      search: event.target.value,
    });
  };



  handleFiltering(bonus, searchTerm) {
    const shop = this.shopUtils.getShopByID(bonus.spotID);
    return bonus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.name.toLowerCase().includes(searchTerm.toLowerCase());
  }

  render() {
    const searchKeyword = this.state.search;
    const order = this.state.order;
    const { bonus, bonusCredit } = this.props;
    let info;
    let _this = this;
    let bonuses = bonus;
    // filter
    if (searchKeyword) {
      bonuses = bonus.filter(bonus => this.handleFiltering(bonus, searchKeyword));
    }
    switch (order) {
      case 0:
        // order by distance to shop
        bonuses.sort(function (a, b) {
          const distanceShopA = _this.shopUtils.getDistanceToShop(a.spotID, _this.state.position);
          const distanceShopB = _this.shopUtils.getDistanceToShop(b.spotID, _this.state.position);
          return distanceShopA - distanceShopB;
        });
        info = "distance";
        break;
      case 1:
        // order by price
        bonuses.sort(function (a, b) {
          return a.cost - b.cost;
        });
        info = "cost";
        break;

      default:
        break;
    }

    const BonusOffline = withOfflineBehaviourSingleElement(Bonus);
    const causeBonus = bonuses.filter(bonus => isCauseBonus(bonus));
    bonuses = bonuses.filter(bonus => bonusAvailableForDate(bonus) && !isCauseBonus(bonus));

    const listItems = bonuses.map((bonus, index) => <li key={"bonus_" + index}>
      <BonusOffline
        causeBonus={isCauseBonus(bonus)}
        reward={bonus}
        info={info}
        distance={_this.shopUtils.getDistanceToShop(bonus.spotID, _this.state.position)}
        shop={this.shopUtils.getShopByID(bonus.spotID)}
      ></BonusOffline>
    </li>);


    const buttons = ['Mais próximo', 'Mais alcançável'];
    return (
      <React.Fragment>
        {/* bonus credit */}
        <div className="text-center">
          <img src={bonusCreditIcon} alt='' className="icon-normal" />
          <p><span className="text-h1">{bonusCredit} </span>créditos de bónus</p>
        </div>
        {/* search bar */}
        {/* <TextField
          id='search-bar'
          label="Pesquisar por loja, local ou tipo de bónus"
          onChange={this.handleSearch('search-bar')}
          fullWidth
          type="search"
          InputProps={{
            startAdornment: <InputAdornment position="start">
              <img src={searchIcon} alt='' className="icon-small" />
            </InputAdornment>,
          }}
        /> */}
        {causeBonus.length > 0 && (
          <React.Fragment>
            <p className="text-bold text-center">Tem 1 bónus gratuito por levantar</p>
            <BonusOffline
              causeBonus={true}
              reward={causeBonus[0]}
              info={info}
              distance={_this.shopUtils.getDistanceToShop(causeBonus[0].spotID, _this.state.position)}
              shop={this.shopUtils.getShopByID(causeBonus[0].spotID)}
            ></BonusOffline>
          </React.Fragment>

        )}

        <ButtonsSwitch
          buttons={buttons}
          buttonSelected={this.buttonSelected}
        />
        <ul>
          {listItems}
        </ul>

      </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps)(BonusList));
