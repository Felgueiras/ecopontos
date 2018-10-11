import React, { Component } from 'react'
import { connect } from "react-redux";

import WalletUtils from './WalletUtils'

// birds
import bird from '../img/ilustracoes/impacto_ambiental/cidade_ecologica/passaro_gr.svg'
// import bird from '../img/ilustracoes/impacto_ambiental/cidade_ecologica/passaro_md.svg'
// import bird from '../img/ilustracoes/impacto_ambiental/cidade_ecologica/passaro_pq.svg'
// sun
import sun from '../img/ilustracoes/impacto_ambiental/cidade_poluida/sol.svg'
// import sun from '../img/ilustracoes/impacto_ambiental/cidade_ecologica/sol.svg'
// clouds
import cloud from '../img/ilustracoes/impacto_ambiental/cidade_poluida/nuvem_1.svg'
import cloud2 from '../img/ilustracoes/impacto_ambiental/cidade_poluida/nuvem_2.svg'
import cloud3 from '../img/ilustracoes/impacto_ambiental/cidade_poluida/nuvem_3.svg'
import cloud4 from '../img/ilustracoes/impacto_ambiental/cidade_poluida/nuvem_4.svg'
import cloud5 from '../img/ilustracoes/impacto_ambiental/cidade_poluida/nuvem_5.svg'
import cloud6 from '../img/ilustracoes/impacto_ambiental/cidade_poluida/nuvem_6.svg'


// mountains + houses
import mountainsHouses from '../img/ilustracoes/impacto_ambiental/cidade_ecologica/montanhas_casas.svg'
import ImpactTrees from '../scenes/Dashboard/scenes/panel/components/ImpactTrees';
import ImpactPeopleBikes from '../scenes/Dashboard/scenes/panel/components/ImpactPeopleBikes';
import ImpactFactories from '../scenes/Dashboard/scenes/panel/components/ImpactFactories';
import ImpactECars from '../scenes/Dashboard/scenes/panel/components/ImpactECars';
import ImpactCars from '../scenes/Dashboard/scenes/panel/components/ImpactCars';
import { storeImpact } from '../redux/actions';





class ImpactUtils extends Component {


    state = {
        initial: true
    }

    constructor(props) {
        super(props);

        const { days, shops, cars, factories, trees, birds, total } = this.props.constructorProps;


        this.cars = cars;
        this.birds = birds;
        this.trees = trees;
        this.factories = factories;

        this.balance = total;
        const challengeDays = days;

        const numQuizzes = 4;

        // points per activity
        const pointsWalkingKM = 10;
        const pointsBikingKM = 10;
        const pointsEnergySavingPercent = 10;
        const pointsQuiz = 120;
        const pointsCheckinOne = 10;
        const pointsEcarKm = 5;

        // daily max
        const dailyWalking = 5;
        const dailyBiking = 10;
        const dailyEnergy = 2 / 3;
        const dailyEcar = 50;

        // calc variables
        const pointsWalking = pointsWalkingKM * dailyWalking * challengeDays;
        const pointsBike = pointsBikingKM * dailyBiking * challengeDays;
        const pointsEnergy = Math.ceil(pointsEnergySavingPercent * dailyEnergy * challengeDays);
        const pointsQuizzes = numQuizzes * pointsQuiz;
        const pointsCheckin = shops * pointsCheckinOne * challengeDays;
        const pointsEcar = pointsEcarKm * dailyEcar * challengeDays;

        this.maxPoints = pointsWalking + pointsBike + pointsQuizzes + pointsCheckin + pointsEnergy + pointsEcar;

        // thresholds
        this.thresholdCarPerson = pointsWalking / cars;
        this.thresholdCarBike = pointsBike / cars;
        this.thresholdCarEcar = pointsEcar / cars;
        this.thresholdTree = (pointsQuizzes + pointsCheckin) / trees;
        this.thresholdBird = (pointsQuizzes + pointsCheckin) / birds;
        this.thresholdFactory = pointsEnergy / factories;
        this.thresholdFactory = pointsEnergy / factories;

    }

    componentDidMount() {
        let _this = this;

        window.onresize = function (event) {
            _this.setState({});
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.initial != nextState.initial) {
            return false;
        }
        return true;
    }


    render() {
        const { birds, people, trees, factories, balance, bikes, eCars, wallet, impactElements } = this.props;
        const { initial } = this.state;

        this.balance = balance;
        this.walletUtils = new WalletUtils(wallet.transactions);
        this.testingPeople = people;
        this.testingBikes = bikes;
        this.testingTrees = trees;
        this.testingBirds = birds;
        this.testingFactories = factories;
        this.testingEcar = eCars;

        const impactHeight = window.jQuery("#root").width() * 0.33;

        const background = {
            backgroundSize: 'cover',
            backgroundColor: this.getBackgroundColor(),
            height: impactHeight
        };

        const indexesPeople = [4, 6, 2, 8, 0];
        const indexesBikes = [5, 1, 7, 3, 9];

        let differences = false;

        let numPeople = this.getNumPeople();
        let numBirds = this.getNumBirds();
        let numBikes = this.getNumBikes();
        let numFactories = this.getNumFactories();
        let numCars = this.getNumCars();
        let numTrees = this.getNumTrees();


        // if different, render previous and then update new
        // TODO - do this only for the first render
        if (initial) {

            if (numPeople !== impactElements.people) {
                numPeople = impactElements.people;
                differences = true;
            }
            if (numBirds !== impactElements.birds) {
                numBirds = impactElements.birds;
                differences = true;
            }
            if (numBikes !== impactElements.bikes) {
                numBikes = impactElements.bikes;
                differences = true;
            }
            if (numFactories !== impactElements.factories) {
                numFactories = impactElements.factories;
                differences = true;
            }
            if (numCars !== impactElements.cars) {
                numCars = impactElements.cars;
                differences = true;
            }
            if (numTrees !== impactElements.trees) {
                numTrees = impactElements.trees;
                differences = true;
            }

            this.setState({initial: false})
        }

        if (differences) {
            let _this = this;
            setTimeout(() => {
                _this.updateNumElementsRedux();
            }, 3000);
        }



        return (
            <div style={background}>
                {this.getSun()}
                {this.getClouds()}
                {this.getMountainsHouses()}
                <ImpactTrees
                    trees={numTrees}
                />
                <ImpactFactories
                    factories={numFactories}
                    max={this.factories}
                />
                <ImpactCars
                    indexesPeople={indexesPeople}
                    indexesBikes={indexesBikes}
                    cars={numCars}
                    people={numPeople}
                    bikes={numBikes}
                    max={this.cars}
                />
                {/* <ImpactECars
                    eCars={this.getNumEcars()}
                    max={this.cars}
                /> */}
                <ImpactPeopleBikes
                    indexesPeople={indexesPeople}
                    indexesBikes={indexesBikes}
                    people={numPeople}
                    bikes={numBikes}
                    max={this.cars}
                />
                {this.getBirds()}
            </div>
        )

    }

    updateNumElementsRedux() {
        let impactElements = {
            cars: this.getNumCars(),
            people: this.getNumPeople(),
            bikes: this.getNumBikes(),
            factories: this.getNumFactories(),
            birds: this.getNumBirds(),
            trees: this.getNumTrees()
        }
        this.props.storeImpact(impactElements);
    }





    getNumTrees() {
        if (this.testingTrees !== undefined) return this.testingTrees;
        const points = this.walletUtils.getTokensEarnedInCheckin() + this.walletUtils.getTokensEarnedInQuizzes();
        const numTrees = Math.floor(points / this.thresholdTree);
        return numTrees;
    }

    getNumCars() {
        const res = this.cars;
        const carReplacedByPerson = this.getNumPeople();
        const carReplacedByBike = this.getNumBikes();
        return res - carReplacedByPerson - carReplacedByBike;
    }



    getNumEcars() {
        if (this.testingEcar) return this.testingEcar;
        // TODO - get tokens energy saving
        const tokensEcar = this.walletUtils.getTokensEarnedInUserActivity('biking');
        return Math.floor(tokensEcar / this.thresholdCarEcar);
    }

    getNumFactories() {
        if (this.testingFactories !== undefined) return this.testingFactories;
        const tokensEnergySaving = this.walletUtils.getTokensEarnedInEnergySaving();
        const numFactories = this.factories - Math.floor(tokensEnergySaving / this.thresholdFactory);
        return numFactories;
    }


    getNumBirds() {
        if (this.testingBirds) {
            return this.testingBirds;
        }
        const points = this.walletUtils.getTokensEarnedInCheckin() + this.walletUtils.getTokensEarnedInQuizzes();
        const numBirds = Math.floor(points / this.thresholdBird);
        return numBirds;
    }

    getNumPeople() {
        if (this.testingPeople !== undefined) return this.testingPeople;
        const tokensWalking = this.walletUtils.getTokensEarnedInUserActivity('user_walking_context');
        return Math.floor(tokensWalking / this.thresholdCarPerson);
    }


    getNumBikes() {
        if (this.testingBikes !== undefined) return this.testingBikes;
        const tokensBiking = this.walletUtils.getTokensEarnedInUserActivity('user_biking_context');
        return Math.floor(tokensBiking / this.thresholdCarBike);
    }



    getCloudsColor() {
        const endColor = '638e93';
        const startColor = '6dd5e6';
        const percentage = this.balance / this.maxPoints * 100;

        // grey -> blue
        return `${this.mix(startColor, endColor, percentage)}`
    }

    getBackgroundColor() {
        const endColor = '638e93';
        const startColor = '6dd5e6';
        const percentage = this.balance / this.maxPoints * 100;


        // grey -> blue
        return `${this.mix(startColor, endColor, percentage)}`
    }

    mix(color_1, color_2, weight) {
        function d2h(d) { return d.toString(16); }  // convert a decimal value to hex
        function h2d(h) { return parseInt(h, 16); } // convert a hex value to decimal 

        weight = (typeof (weight) !== 'undefined') ? weight : 50; // set the weight to 50%, if that argument is omitted

        var color = '#';

        for (var i = 0; i <= 5; i += 2) { // loop through each of the 3 hex pairs—red, green, and blue
            var v1 = h2d(color_1.substr(i, 2)), // extract the current pairs
                v2 = h2d(color_2.substr(i, 2)),
                // combine the current pairs from each source color, according to the specified weight
                val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));
            while (val.length < 2) { val = '0' + val; } // prepend a '0' if val results in a single digit
            color += val; // concatenate val to our new color string
        }

        return color;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }



    getSun() {
        let list = [];
        const sunStyle = {
            width: '5%',
            height: 'auto',
            top: `${20}%`,
            left: `${10}%`
        };
        const listItem = <img src={sun}
            className="absolute"
            alt="Thumbnail"
            style={sunStyle} />;
        list.push(listItem)
        return list;
    }

    getBirds() {
        const numBirds = this.getNumBirds();
        let list = [];
        for (let index = 0; index < numBirds; index++) {
            const birdStyle = {
                width: '3%',
                height: 'auto',
                top: `${this.getRandomInt(0, 30)}%`,
                left: `${this.getRandomInt(0, 95)}%`
            };
            const listItem = <img src={bird}
                className="absolute"
                alt="Thumbnail"
                style={birdStyle} />;
            list.push(listItem)
        }
        return list;
    }

    getMountainsHouses() {
        const style = {
            width: '100%',
            height: 'auto%',
            bottom: 0,
            right: 0
        };
        const listItem = <img src={mountainsHouses}
            className="absolute"
            alt="Thumbnail"
            style={style} />;
        return listItem;
    }

    getClouds() {
        const numClouds = 6;
        let list = [];
        const cloudImages = [cloud, cloud2, cloud3, cloud4, cloud5, cloud6]
        for (let index = 0; index < numClouds; index++) {
            const cloudStyle = {
                width: '8%',
                height: 'auto',
                top: `${this.getRandomInt(5, 40)}%`,
                left: `${this.getRandomInt(5, 95)}%`
            };
            const image = cloudImages[index % cloudImages.length];
            const listItem = <img src={image}
                className="absolute"
                alt="Thumbnail"
                style={cloudStyle} />;
            list.push(listItem)
        }
        return list;
    }

    componentWillUnmount() {
        this.updateNumElementsRedux();

    }

}

const mapStateToProps = state => {
    return {
        impactElements: state.impactElements
    };
};

const mapDispatchToProps = dispatch => {
    return {
        storeImpact: impactElements => dispatch(storeImpact(impactElements))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(ImpactUtils);
