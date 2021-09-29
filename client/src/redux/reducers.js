import { combineReducers } from "redux";
import isAuthorizedReducer from "./isAuthorized/reducer";
import trackReducer from "./trackData/reducer";
import userReducer from "./userData/reducer";

const reducers = combineReducers({
  isAuthorized: isAuthorizedReducer,
  trackReducer: trackReducer,
  userReducer: userReducer,
});

export default reducers;
