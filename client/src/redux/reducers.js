import { combineReducers } from "redux";
import isAuthorizedReducer from "./isAuthorized/reducer";
import trackReducer from "./trackData/reducer";

const reducers = combineReducers({
  isAuthorized: isAuthorizedReducer,
  trackReducer: trackReducer,
});

export default reducers;
