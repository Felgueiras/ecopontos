import {
  ADD_LOGIN,
  LOGOUT,
  SET_SHOPS,
  SET_WALLET,
  SET_CAUSE,
  SET_ACTIVITY,
  SET_POSITION,
  AUTHORIZE,
  SET_QUIZZES,
  SET_IDENTITY,
  SET_BONUS,
  SET_CONNECTIVITY,
  SET_PUBLIC_WALLETS,
  SET_WALKTHROUGH,
  RESET,
  FINISHED_SETUP,
  VISITED_DASHBOARD,
  NEW_QUIZZES,
  SET_PERMISSION,
  NOTIFICATIONS,
  SHOW_NOTIFICATIONS,
  STORE_IMPACT,
  SET_CODE,
  SET_TICKETS,
  SET_STATE_KEY
} from "../constants/action-types";

const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

// declare initial state
const initialState = {
  code: undefined,
  login: null,
  wallet: {},
  shops: [],
  logged: false,
  cause: null,
  position: null,
  authorizations: [],
  quizzes: [],
  identity: null,
  bonus: [],
  network: true,
  publicWallets: [],
  walkthrough: true,
  finishedSetup: false,
  visitedDashboard: false,
  shownQuiz: false,
  shownBonus: false,
  shownBonusAvailable: false,
  newBonuses: 0,
  notificationDate: currentDate,
  newQuizzes: 0,
  permissions: [],
  tickets: [],
  showNotifications: false,
  impactElements: {
    cars: 10,
    bikes: 0,
    people: 0,
    birds: 0,
    factories: 4,
    trees: 0
  },
  clickedTable: {
    elearning: false,
    checkin: false,
    gfit: false,
    electricity: false,
  }
};

// instantiate reducer for handling actions
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FINISHED_SETUP:
      return { ...state, finishedSetup: true };
    case SET_STATE_KEY: {
      let key = action.payload.key;
      var obj = {};
      const payload = action.payload.payload;
      if (key.includes('.')) {
        let subkey;
        [key, subkey] = key.split('.');
        obj[key] = state[key];
        obj[key][subkey] = payload;
      }
      else {
        obj[key] = payload;
      }


      return { ...state, ...obj };
    }
    case SET_BONUS:
      return { ...state, bonus: action.payload };
    case SET_WALKTHROUGH:
      return { ...state, walkthrough: action.payload };
    case SET_CODE:
      return { ...state, code: action.payload };
    case SET_IDENTITY:
      return { ...state, identity: action.payload };
    case ADD_LOGIN:
      return { ...state, login: action.payload, logged: true };
    case SET_SHOPS:
      return { ...state, shops: action.payload };
    case STORE_IMPACT:
      return { ...state, impactElements: action.payload };
    case VISITED_DASHBOARD:
      return { ...state, visitedDashboard: true };
    case SET_PERMISSION: {
      const permission = action.payload.permission;
      let newPermissions = state.permissions;
      if (action.payload.authorization === true) {
        if (!newPermissions.includes(permission)) {
          return { ...state, permissions: [...state.permissions, permission] };
        }
      } else {
        const index = newPermissions.indexOf(permission);
        if (index > -1) {
          newPermissions.splice(index, 1);
        }
        return { ...state, authorizations: [...state.authorizations] };
      }
      break;
    }
    case SET_QUIZZES:
      return { ...state, quizzes: action.payload };
    case SET_CONNECTIVITY:
      if (action.payload === "online") {
        return { ...state, network: true };
      } else {
        return { ...state, network: false };
      }

    case SET_TICKETS:
      return { ...state, tickets: action.payload };
    case SET_WALLET:
      return { ...state, wallet: action.payload };
    case SET_PUBLIC_WALLETS:
      return { ...state, publicWallets: action.payload };
    case AUTHORIZE: {
      const account = action.payload.account;
      let newAuths = state.authorizations;
      if (action.payload.authorization === true) {
        if (!newAuths.includes(account)) {
          return {
            ...state,
            authorizations: [...state.authorizations, account]
          };
        }
      } else {
        const index = newAuths.indexOf(account);
        if (index > -1) {
          newAuths.splice(index, 1);
        }
        return { ...state, authorizations: [...state.authorizations] };
      }
      break;
    }
    case SET_POSITION:
      return { ...state, position: action.payload };
    case SHOW_NOTIFICATIONS:
      return { ...state, showNotifications: true };
    case NOTIFICATIONS:
      return {
        ...state,
        shownBonus: action.payload.shownBonus,
        notificationDate: action.payload.date,
        shownQuiz: action.payload.shownQuiz,
        shownBonusAvailable: action.payload.shownBonusAvailable,
        newBonuses: action.payload.newBonuses
      };
    case NEW_QUIZZES:
      return { ...state, newQuizzes: action.payload };
    case SET_CAUSE:
      return { ...state, cause: action.payload };
    case SET_ACTIVITY: {
      // {name, data}
      const name = action.payload.name;
      const data = action.payload.data;
      let newState = {
        ...state
      };
      newState[name] = data;
      return newState;
    }
    case LOGOUT:
      return { ...state, logged: false };
    case RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default rootReducer;
