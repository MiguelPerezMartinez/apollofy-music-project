import { combineReducers } from "redux";
import isAuthorizedReducer from "./isAuthorized/reducer";
import trackReducer from "./trackData/reducer";
import userReducer from "./userData/reducer";
import dialogueHandlerReducer from "./dialogueHandler/reducer";
<<<<<<< HEAD
import searchHandlerReducer from "./searchHandler/reducer";
=======
import modalsHandlerReducer from "./modalsHandler/reducer";
>>>>>>> d437fdab99c1ea5036ca57e799c1bc0b6f752738

const reducers = combineReducers({
  isAuthorized: isAuthorizedReducer,
  dialogueHandler: dialogueHandlerReducer,
  trackReducer: trackReducer,
  userReducer: userReducer,
<<<<<<< HEAD
  searchHandler: searchHandlerReducer,
=======
  modalsHandler: modalsHandlerReducer,
>>>>>>> d437fdab99c1ea5036ca57e799c1bc0b6f752738
});

export default reducers;
