import {createStore} from "redux";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from "../reducers/index";

const persistConfig = {
  key: 'root',
  storage: storage
};

const pr = persistReducer(persistConfig, rootReducer);

// create store
export const store = createStore(pr, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const persistor = persistStore(store);

// delete everything from persistence 
// persistor.purge(); 