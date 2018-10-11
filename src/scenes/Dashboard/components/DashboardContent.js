import React from "react";
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
// Redux
import { connect } from "react-redux";
import {
    performLogout, setShops, setWallet, setQuizzes, setPublicWallets,
    setBonus, setWalkthrough, visitedDashboard, setIdentity
} from "../../../redux/actions/index";

import { withOfflineBehaviour } from '../../../utils/HoCs'


import {
    startElearningPlayer, startLocationReporter, startWallet,
    startUserActivity, loadDeviceManager, sendWalletMessage, startGroupChatManager
} from '../runtimeHelper';

// components
import LoadingScreen from '../../WelcomeScreen/LoadingScreen'
import Panel from '../scenes/panel/Panel';
import ChallengeOverview from '../scenes/panel/components/ChallengeOverview';

import { HashRouter, withRouter } from "react-router-dom";

// walkthrough
import Joyride from "react-joyride";
import { walkthroughStyle, stepsDashboard } from '../../../utils/walkthrough-helper'

import '../../../css/index.css';
import '../../../css/react-table.css';
import ShopsMap from "../scenes/shops/ShopsMap";
import Shops from "../scenes/shops/Shops";
import Quiz from "../scenes/learning/Quiz";
import QuizzesList from "../scenes/learning/QuizzesList";
import BonusList from "../scenes/rewards/BonusList";
import Profile from "../../Profile/Profile";
import Help from "../scenes/help/Help";
import Glossary from "../scenes/help/Glossary";
import About from "../scenes/help/About";
import FeedbackUser from "../scenes/help/FeedbackUser";
import FeedbackMessageDetail from "../scenes/help/FeedbackMessageDetail";
import FeedbackNewMessage from "../scenes/help/FeedbackNewMessage";
import ExternalAccountsSetup from "../../Settings/scenes/ExternalAccountsSetup";
import TermsConditions from "../scenes/help/TermsConditions";
import InfoScreens from "../../WelcomeScreen/InfoScreens";
import Settings from "../scenes/settings/Settings";
import History from "../scenes/history/History";
import FeedbackAgent from "../scenes/help/FeedbackAgent";
import CauseAPI from "../../../services/api/CauseAPI";
import FeedbackChat from "../scenes/help/FeedbackChat";
import Forum from "../scenes/forum/Forum";
import Manual from "../scenes/help/Manual";
import ChatUtils from "../../../utils/ChatUtils";

const mapStateToProps = state => {
    return {
        wallet: state.wallet,
        authorizations: state.authorizations,
        walkthrough: state.walkthrough,
        cause: state.cause,
        code: state.code,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        performLogout: article => dispatch(performLogout(article)),
        setShops: shops => dispatch(setShops(shops)),
        setIdentity: shops => dispatch(setIdentity(shops)),
        setWallet: wallet => dispatch(setWallet(wallet)),
        setQuizzes: quizzes => dispatch(setQuizzes(quizzes)),
        setBonus: bonus => dispatch(setBonus(bonus)),
        setPublicWallets: wallets => dispatch(setPublicWallets(wallets)),
        setWalkthrough: walkthrough => dispatch(setWalkthrough(walkthrough)),
        visitedDashboard: walkthrough => dispatch(visitedDashboard()),
    };
};

class DashboardContent extends React.Component {

    UNSAFE_componentWillMount() {
        if (this.state.page === -1) {
            this.setState({ page: 0 });
        }
    }

    componentDidMount() {
        if (window.hypertiesStarted === true) {
            this.setState({ ready: true });
            this.props.history.replace("/dashboard/panel");
            this.props.visitedDashboard();
            return;
        }
        if (window.settingsWaiting !== true && this.props.ready !== true) {
            this.waitRuntime();
        }

        window.settingsWaiting = false;
    }

    constructor(props) {
        super(props);

        let numHyperties = 3;
        if (this.props.authorizations.includes('gfit'))
            numHyperties++;
        if (this.props.code)
            numHyperties++;
        // if (this.props.authorizations.includes('edp'))
        //     numHyperties++;

        const loadedHyperties = window.hypertiesStarted ? window.hypertiesStarted : 0;

        this.state = {
            page: this.props.page ? this.props.page : -1,
            open: this.props.open ? this.props.open : false,
            appBarTitle: "My sharing Lisboa",
            ready: this.props.ready ? this.props.ready : loadedHyperties === true,
            loadedHyperties: loadedHyperties,
            completed: 0,
            bottomBar: true,
            numHyperties: numHyperties,
            confirmation: false
        };
        this.drawer = React.createRef();


        if (this.state.ready) {
            this.props.history.replace("/dashboard/panel");
            this.props.visitedDashboard();

        }

        let _this = this;

        function handleLoading(component) {
            console.log('[Dashboard] HandleLoading: ', component);
            if (component === 'runtime') {
                window.componentsLoaded = 1;
            }
            else if (component === 'load') {
                window.hypertiesLoaded++;
            }
            else {
                window.hypertiesStarted = _this.state.loadedHyperties + 1;
            }

            const numComponents = 1;
            const nToLoad = numHyperties + numComponents + numHyperties;
            const nLoaded = window.hypertiesStarted + window.hypertiesLoaded + window.componentsLoaded;
            let completed = (nLoaded / nToLoad) * 100;

            _this.setState({
                loadedHyperties: window.hypertiesStarted,
                completed: completed
            });

            if (nToLoad === nLoaded) {
                // wait few miliseconds
                function continueToPanel() {
                    _this.setState({ ready: true });
                    window.completed = true;
                    _this.props.history.replace("/dashboard/panel");
                    _this.props.visitedDashboard();
                }
                setTimeout(continueToPanel, 1000);
            }
        }

        window.loadedComponent = function () {
            handleLoading('runtime')
        }

        window.hypertyWasLoaded = function () {
            handleLoading('load');
        }

        window.hypertyWasStarted = function () {
            handleLoading('hyperty');
        }
    }


    waitRuntime = () => {
        let _this = this;

        setTimeout(() => {

            if (!window.runtime) {
                this.waitRuntime();
                return;
            }
            // loaded runtime
            window.loadedComponent();

            runtime.listenShowAdmin().then(function (result) {
                // go to login page
                _this.props.history.replace("/login");
            }).catch(function (reason) {
                console.error(reason);
            });

            runtime.requireProtostub("sharing-cities-dsm");


            const waitForObjs = !_this.props.visitedDashboard;

            if (_this.props.code) {
                startGroupChatManager().then(function (result) {
                    ChatUtils.registerHandlers();
                });
            }

            // load hyperties
            startWallet(_this.props.setWallet, _this.props.setIdentity, _this.props.wallet, _this.props.personalData, _this.props.setPublicWallets, waitForObjs).then(() => {
                const causeAddress = CauseAPI.fetchCauses().filter(cause => cause.id === _this.props.cause.id)[0].address;
                sendWalletMessage(causeAddress);
                startElearningPlayer(_this.props.setQuizzes, waitForObjs);
                startLocationReporter(_this.props.setShops, _this.props.setBonus, waitForObjs);

                if (this.props.authorizations.includes('gfit')) {
                    startUserActivity();
                }

                // if (this.props.authorizations.includes('edp')) {
                //     loadDeviceManager(true);
                // }

            });


        }, 500);
    };

    handleJoyrideCallback = (state) => {

        if (state.action === "close") {
            window.walkthroughDashboardCompleted = true;
            this.forceUpdate();
            this.props.setWalkthrough(false);
        }
        if (state.status === "finished" || state.status === "skip") {
            window.walkthroughDashboardCompleted = true;
            this.props.setWalkthrough(false);
        }

    }


    render() {

        const currentPath = this.props.history.location.pathname;
        const address = currentPath.split("/")[2];
        if (this.state.ready === false && address === undefined) {
            return (
                <React.Fragment>
                    <LoadingScreen determinate completed={this.state.completed} />
                </React.Fragment>
            );
        }

        const run = this.props.walkthrough && (window.walkthroughDashboardCompleted !== true);

        if (!window.completed) {
            return (
                <Redirect to={{ pathname: "/dashboard" }} />
            );
        }

        return (
            <React.Fragment>
                <HashRouter>
                    <React.Fragment>
                        <Joyride
                            locale={{ back: 'Voltar', close: 'Fechar', last: 'Terminar', next: 'Próximo', skip: 'Ignorar' }}
                            continuous
                            scrollToFirstStep
                            showProgress
                            showSkipButton={false}
                            run={run}
                            steps={stepsDashboard}
                            callback={this.handleJoyrideCallback}
                            styles={walkthroughStyle}
                        />
                        <React.Fragment>

                            <div className="content-margin">
                                <Switch>
                                    <Route exact path='/dashboard/panel' component={Panel} />
                                    <Route exact path='/dashboard/challenge' component={ChallengeOverview} />
                                    <Route exact path='/dashboard/learning' component={QuizzesList} />
                                    <Route exact path='/dashboard/learning/quiz/:id' component={Quiz} />
                                    <Route exact path='/dashboard/map/:id' component={ShopsMap} />
                                    <Route exact path='/dashboard/map/:id/bonus/:bonusID' component={ShopsMap} />
                                    <Route exact path='/dashboard/shops' component={Shops} />
                                    <Route exact path='/dashboard/bonus' component={BonusList} />
                                    <Route exact path='/dashboard/profile' component={Profile} />
                                    <Route exact path='/dashboard/history' component={History} />
                                    <Route exact path='/dashboard/help' component={Help} />
                                    <Route exact path='/dashboard/forum' component={Forum} />
                                    <Route exact path='/dashboard/help/glossary' component={Glossary} />
                                    <Route exact path='/dashboard/help/manual' component={Manual} />
                                    <Route exact path='/dashboard/help/terms' component={TermsConditions} />
                                    <Route exact path='/dashboard/help/tutorial' component={InfoScreens} />
                                    <Route exact path='/dashboard/help/about' component={About} />
                                    <Route exact path='/dashboard/help/feedback' render={FeedbackUser} />
                                    <Route exact path='/dashboard/help/feedback/agent' component={FeedbackAgent} />
                                    <Route exact path='/dashboard/help/feedback/chat/:id' component={FeedbackChat} />
                                    <Route exact path='/dashboard/help/feedback/new' component={FeedbackNewMessage} />
                                    <Route exact path='/dashboard/accounts' component={ExternalAccountsSetup} />
                                    <Route exact path='/dashboard/settings' component={Settings} />
                                    {/* <Redirect to="/dashboard/panel" />                             */}
                                </Switch>
                            </div>
                        </React.Fragment>
                    </React.Fragment>
                </HashRouter>
            </React.Fragment>
        );
    }
}

export default withOfflineBehaviour()(withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardContent)));


