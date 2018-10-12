import {
  SET_ECOPONTOS,
  SET_LOCATION
} from "../constants/action-types";


// declare initial state
const initialState = {
  ecopontos: [],
  userLocation: { lat: 40, lng: 10 }
};

// instantiate reducer for handling actions
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ECOPONTOS:
      return { ...state, ecopontos: action.payload };
    case SET_LOCATION:
      return { ...state, userLocation: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
