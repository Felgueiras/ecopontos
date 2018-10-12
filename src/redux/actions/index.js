import {
    SET_ECOPONTOS,
    SET_LOCATION
} from "../constants/action-types";

export const setEcopontos = ecopontos => ({ type: SET_ECOPONTOS, payload: ecopontos });
export const setUserLocation = location => ({ type: SET_LOCATION, payload: location });
