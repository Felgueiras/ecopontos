import { store } from '../../redux/store/index'
import CustomEvents from '../../utils/CustomEvents';

export const CRMaddress = "hyperty://sharing-cities-dsm/crm";
export const CRMaddressTickets = 'hyperty://sharing-cities-dsm/crm/tickets';

function loadChatManager() {

    return new Promise((resolve, reject) => {
        const Config = require("Config");
        const groupChatManagerUrl = "hyperty-catalogue://catalogue." + Config.serverUrl + "/.well-known/hyperty/GroupChatManager";

        runtime
            .requireHyperty(groupChatManagerUrl, true)
            .then(function (result) {
                // your code
                console.log("loaded group chat manager ", result);
                const groupChatManager = result.instance;

                // window.chatController = result;

                // groupChatManager._resumeReporters();
                window.groupChatManager = groupChatManager;
                resolve(true);
            })
            .catch(function (reason) {
                console.error(reason);
            });
    });

}

export function startGroupChatManager(waitForObjs = true) {

    return new Promise((resolve, reject) => {

        function startGroupChatManagerHelper() {

            window.hypertyWasStarted();
            resolve(true);
        }

        if (!window.groupChatManager) {
            loadChatManager().then(function (res) {
                window.hypertyWasLoaded();
                startGroupChatManagerHelper();
            });
        }
        else {
            window.hypertyWasLoaded();
            startGroupChatManagerHelper();
        }
    });
}

function loadLocationReporter() {


    return new Promise((resolve, reject) => {
        const Config = require("Config");
        const locationReporterUrl = "hyperty-catalogue://catalogue." + Config.serverUrl + "/.well-known/hyperty/LocationReporter";


        runtime
            .requireHyperty(locationReporterUrl, true)
            .then(function (result) {
                // your code
                console.log("loaded location reporter ", result);


                const locationReporter = result.instance;

                locationReporter._resumeReporters().then(function (result) {
                    console.log('[LocationReporter] Reporter Resumed', result)
                    // false - location updates only required in map
                    locationReporter.initPosition(false);

                    // store in window
                    window.locationReporter = locationReporter;
                    resolve(true);
                });

            })
            .catch(function (reason) {
                console.error(reason);
            });
    });

}

export function startLocationReporter(setShops, setBonus, waitForObjs = true) {

    function startLocationReporterHelper() {

        let locationReporter = window.locationReporter;

        if (waitForObjs === false) {
            window.hypertyWasStarted();
        }

        // SHOPS
        function fetchShops() {
            // some async operation that returns a promise
            return new Promise((resolve, reject) => {
                locationReporter
                    .retrieveSpots("data://sharing-cities-dsm/shops")
                    .then(function (result) {
                        if (result.body.code === 200) {
                            const shops = result.body.value.values;
                            setShops(shops);
                            locationReporter.invite("hyperty://sharing-cities-dsm/checkin-rating").then(function (res) {
                            });
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    })
                    .catch(function (reason) {
                        console.error(reason);
                        return false;
                    });
            })
        }

        // BONUS
        function fetchBonus() {
            // some async operation that returns a promise
            return new Promise((resolve, reject) => {
                locationReporter
                    .retrieveSpots("data://sharing-cities-dsm/bonus")
                    .then(function (result) {
                        if (result.body.code === 200) {
                            const bonus = result.body.value.values;
                            setBonus(bonus);
                            resolve(true);
                        }
                        else {
                            resolve(false)
                        }
                    })
                    .catch(function (reason) {
                        console.error(reason);
                    });
            })
        }

        function next(toDo) {
            return toDo().then(function (result) {
                if (result !== true) {
                    return next(toDo);
                } else return result;
            });
        }

        Promise.all([next(fetchShops), next(fetchBonus)]).then(function (values) {
            if (waitForObjs === true) {
                window.hypertyWasStarted();
            }
        });


    }

    if (!window.locationReporter) {
        loadLocationReporter().then(function (res) {
            window.hypertyWasLoaded();
            startLocationReporterHelper();
        });
    }
    else {
        window.hypertyWasLoaded();
        startLocationReporterHelper();
    }
}

function loadElearningPlayer() {


    return new Promise((resolve, reject) => {
        const Config = require("Config");
        const elearningPlayer = "hyperty-catalogue://catalogue." + Config.serverUrl + "/.well-known/hyperty/ElearningPlayer";
        runtime.requireHyperty(elearningPlayer, true).then(function (res) {

            console.log("loaded elearningPlayer hyperty ", res);
            window.elearningPlayer = res.instance;
            resolve(true);
        }).catch(function (reason) {
            console.error(reason);
        });
    });

}

export function startElearningPlayer(setQuizzes, waitForObjs = true) {

    function startElearningHelper() {

        let elearningPlayer = window.elearningPlayer;

        if (waitForObjs === false) {
            window.hypertyWasStarted();
        }

        function doSomething() {
            return new Promise((resolve, reject) => {
                elearningPlayer.retrieveQuizzes('data://sharing-cities-dsm/elearning').then((result) => {
                    const quizzes = result.body.value.values;
                    console.info('[LearningPlayer] quizzes: ', quizzes);
                    if (quizzes !== undefined) {
                        setQuizzes(result.body.value.values);
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }).catch((reason) => {
                    console.info('[LearningPlayer] start failed | ', reason);
                });
            })
        }

        function next() {
            return doSomething().then(function (result) {
                if (result !== true) {
                    return next();
                } else return result;
            });
        }

        next().then(function (result) {
            // process final result here
        }).catch(function (err) {
            // process error here
        });

        elearningPlayer._resumeReporters().then((result) => {
            elearningPlayer.initQuizSubmission().then((result) => {
                elearningPlayer.invite("hyperty://sharing-cities-dsm/elearning").then(function (res) {
                    if (waitForObjs === true) {
                        window.hypertyWasStarted();
                    }
                    console.log('learning invited hyperty');
                });
            });
        }).catch((reason) => {
            console.info('[LearningPlayerDemo] start failed | ', reason);
        });
    }

    if (!window.elearningPlayer) {
        loadElearningPlayer().then(function (res) {
            window.hypertyWasLoaded();
            startElearningHelper();
        });
    }
    else {
        window.hypertyWasLoaded();
        startElearningHelper();
    }
}


function loadWallet() {

    return new Promise((resolve, reject) => {
        const Config = require("Config");
        const walletUrl = "hyperty-catalogue://catalogue." + Config.serverUrl + "/.well-known/hyperty/Wallet";

        runtime
            .requireHyperty(walletUrl, true)
            .then(function (res) {
                // your code
                console.log("loaded wallet hyperty", res);
                window.wallet = res.instance;
                window.walletHelper = false;
                resolve(true);
            })
            .catch(function (reason) {
                console.error(reason);
            });
    });
}

export function sendWalletMessage(causeAddress) {
    console.log('[Wallet] sending update message');
    window.wallet.update('wallet2bGranted', causeAddress);
}

export function startWallet(setWallet, setIdentity, wallet, personalData, setPublicWallets, waitForObjs = true) {

    function startWalletHelper() {

        window.walletBalance = false;
        window.walletTransactions = false;
        let walletHypertyLoaded = false;
        function afterUpdate(event) {
            console.log('runtimeHelper: wallet event ', event);
            if (waitForObjs === false && !walletHypertyLoaded) {
                walletHypertyLoaded = true;
                window.hypertyWasStarted();
            }
            if (event.field === "balance") {
                let newWallet = wallet;
                newWallet.balance = event.data;
                setWallet(newWallet);
                window.walletBalance = true;
            } else if (event.field === "transactions") {
                const newTransactions = event.data;
                let newWallet = wallet;
                if (Array.isArray(newTransactions) === true) {
                    // replace current
                    newWallet.transactions = event.data;
                }
                else {
                    // add to current
                    const transactionsCopy = newWallet.transactions;
                    transactionsCopy.push(newTransactions);
                    newWallet.transactions = transactionsCopy;
                }
                setWallet(newWallet);
                window.walletTransactions = true;
                if (window.walletHelper === false && window.walletBalance === true && window.walletTransactions === true) {
                    if (waitForObjs === true) {
                        window.hypertyWasStarted();
                    }
                    window.walletHelper = true;
                }
            }
            else if (event.field === "bonus-credit" && event.data) {
                let newWallet = wallet;
                newWallet['bonus-credit'] = event.data;
                setWallet(newWallet);
                window.bonusCredit = true;
            }
            else if (event.field === "ranking" && event.data) {
                let newWallet = wallet;
                newWallet.ranking = event.data;
                setWallet(newWallet);
                window.walletRanking = true;
            } else if (event.field === "wallets") {
                setPublicWallets(event.data);
            }
        }
        return new Promise((resolve, reject) => {

            window.wallet.identityManager
                .discoverUserRegistered()
                .then(function (identity) {

                    // private wallet
                    setIdentity(identity);

                    let profileInfo = {};
                    if (personalData) {
                        profileInfo = personalData;
                    }
                    const state = store.getState()
                    profileInfo.cause = state.cause.id;
                    profileInfo.balance = 10;
                    profileInfo.code = state.code;
                    identity.profile = profileInfo;
                    window.wallet.start(afterUpdate, identity).
                        then(function (res) {
                            resolve(res);
                        });
                });
        });


    }

    return new Promise((resolve, reject) => {
        const doNext = () => {
            window.hypertyWasLoaded();
            startWalletHelper().then((res) => resolve(res));
        }
        if (!window.wallet) {
            loadWallet().then(function (res) {
                doNext();
            });
        }
        else {
            doNext();
        }


    });

}

export function unregisterEndpointFromDeviceManager(endpointID) {

    // let _this = this;
    window.deviceManagerHyperty.removeEndpoint(myEndpoint).then(function (res) {
        return true;
    }).catch(function (reason) {
        console.error(reason);
    });

    return true;
}

const myEndpoint = 'endpoint';

export function loadDeviceManager(start = false) {

    const Config = require("Config");
    const deviceManagerURL = "hyperty-catalogue://catalogue." + Config.serverUrl + "/.well-known/hyperty/DeviceManager";
    runtime.requireHyperty(deviceManagerURL, true).then(function (res) {
        const deviceManagerHyperty = res.instance;
        window.deviceManagerHyperty = deviceManagerHyperty;
        console.log("loaded device manager hyperty ", res);
        if (start === true) {
            // start
            res.instance.identityManager
                .discoverUserRegistered()
                .then(function (identity) {
                    deviceManagerHyperty.start(identity);
                    deviceManagerHyperty.createDevice().then(function (res) {
                        deviceManagerHyperty.createEndpoint('edp', myEndpoint).then(function (res) {
                            window.hypertyWasStarted();
                        }).catch(function (reason) {
                            console.error(reason);
                        });


                    }).catch(function (reason) {
                        console.error(reason);
                    })
                });
        }

    }).catch(function (reason) {
        console.error(reason);
    });
}

function loadUserActivity() {

    return new Promise((resolve, reject) => {
        runtime.requireProtostub('fitness.google.com');

        const Config = require("Config");
        const userActivityObserver = "hyperty-catalogue://catalogue." + Config.serverUrl + "/.well-known/hyperty/UserActivityObserver";
        runtime.requireHyperty(userActivityObserver, true).then(function (res) {
            window.userActivity = res.instance;
            console.log("loaded useractivity hyperty ", res);
            resolve(true);
        }).catch(function (reason) {
            console.error(reason);
        });
    });

}


export function stopUserActivity() {
    if (window.userActivity) {
        window.userActivity.stop();
    }
}

export function startUserActivity() {

    function userActivityCallback(message) {
        console.log('[GoogleFit]: ', message);
        if (message.code === 400) {
            var event = new CustomEvent(CustomEvents.gfitError, { detail: message });
            dispatchEvent(event);
        }
    }


    function startUserActivityHelper() {

        window.userActivity.identityManager
            .discoverUserRegistered()
            .then(function (identity) {
                window.userActivity.start(userActivityCallback, identity);
                window.hypertyWasStarted();
            });
    }

    if (!window.userActivity) {
        loadUserActivity().then(function (res) {
            window.hypertyWasLoaded();
            startUserActivityHelper();
        });
    }
    else {
        window.hypertyWasLoaded();
        startUserActivityHelper();
    }
}