import React, { Component } from 'react';
import { connect } from "react-redux";

import ImpactUtils from '../../../../../utils/ImpactUtils'

import './styles.css';


export const AnimationContext = React.createContext(true);

class Impact extends Component {

    constructor(props) {
        super(props)

        this.state = {
            animation: false,
            initial: true
        }

    }

    componentDidMount() {
        let _this = this;
        const { initial } = this.state;

        window.onresize = function (event) {
            _this.setState({});
        };

        if (initial) {
            this.setState({
                initial: false
            })
        }
    }



    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.initial != nextState.initial) {
            return false;
        }
        return true;
    }



    checkTransition = (prevBalance, currBalance) => {
        const currentThreshold = this.findThreshold(prevBalance);
        const nextThreshold = this.findThreshold(currBalance);
        if (currentThreshold !== nextThreshold)
            return true;
        else
            return false;
    }

    render() {
        const { balance } = this.props;
        const { initial } = this.state;

        const impactUtilsInitial = {
            days: 30,
            shops: 5,
            cars: 10,
            factories: 4,
            trees: 16,
            birds: 10,
            total: balance
        };


        return (
            <AnimationContext.Provider value={!initial}>
                <div className="container-inside">
                    <ImpactUtils
                        constructorProps={impactUtilsInitial}
                        {...this.props}
                    />
                </div>
            </AnimationContext.Provider>
        )
    }
}

const mapStateToProps = state => {
    return {
        wallet: state.wallet,
        balance: state.wallet.balance,
    };
};

export default connect(mapStateToProps)(Impact);
