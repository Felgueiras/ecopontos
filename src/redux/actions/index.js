import {
    ADD_LOGIN, LOGOUT, SET_SHOPS, SET_WALLET, SET_CAUSE, SET_ACTIVITY, SET_POSITION, AUTHORIZE, SET_QUIZZES,
    SET_IDENTITY, SET_BONUS, SET_STATE_KEY, SET_TICKETS, STORE_IMPACT, SHOW_NOTIFICATIONS, SET_PERMISSION, SET_CONNECTIVITY, NOTIFICATIONS, SET_PUBLIC_WALLETS, UNAUTHORIZE, VISITED_DASHBOARD, SET_WALKTHROUGH, FINISHED_SETUP, RESET, NEW_QUIZZES, SET_CODE
} from "../constants/action-types";

// bonus
export const setBonus = bonus => ({ type: SET_BONUS, payload: bonus });


// login
export const setLogin = login => ({ type: ADD_LOGIN, payload: login });
export const performLogout = login => ({ type: LOGOUT, payload: login });
export const setIdentity = identity => ({ type: SET_IDENTITY, payload: identity });

// shops
export const setShops = shops => ({ type: SET_SHOPS, payload: shops });

// wallets
export const setWallet = wallet => ({ type: SET_WALLET, payload: wallet });
export const setPublicWallets = wallets => ({ type: SET_PUBLIC_WALLETS, payload: wallets });


// causes
export const setCause = cause => ({ type: SET_CAUSE, payload: cause });

// Google Fit
export const setActivity = activity => ({ type: SET_ACTIVITY, payload: activity });

// location
export const setPosition = position => ({ type: SET_POSITION, payload: position });

// accounts
export const authorize = authorization => ({ type: AUTHORIZE, payload: authorization });
export const setPermission = permission => ({ type: SET_PERMISSION, payload: permission });
export const unauthorize = authorization => ({ type: UNAUTHORIZE, payload: authorization });

export const setQuizzes = quizzes => ({ type: SET_QUIZZES, payload: quizzes });

// online - offline
export const setConnectivity = networkState => ({ type: SET_CONNECTIVITY, payload: networkState });

export const setWalkthrough = walkthrough => ({ type: SET_WALKTHROUGH, payload: walkthrough });

export const reset = walkthrough => ({ type: RESET, payload: {} });

export const finishedSetup = walkthrough => ({ type: FINISHED_SETUP, payload: {} });

export const visitedDashboard = walkthrough => ({ type: VISITED_DASHBOARD, payload: {} });

export const newQuizzes = numQuizzes => ({ type: NEW_QUIZZES, payload: numQuizzes });
export const storeImpact = impact => ({ type: STORE_IMPACT, payload: impact });

export const setNotifications = notifications => ({ type: NOTIFICATIONS, payload: notifications });
export const setCode = code => ({ type: SET_CODE, payload: code });
export const setTickets = tickets => ({ type: SET_TICKETS, payload: tickets });
export const setStateKey = payload => ({ type: SET_STATE_KEY, payload: payload });
export const showNotifications = () => ({ type: SHOW_NOTIFICATIONS });
