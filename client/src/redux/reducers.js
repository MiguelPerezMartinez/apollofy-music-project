import { combineReducers } from "redux";
import stringTestReducer from "./userData/reducer";

const reducers = combineReducers({
  stringTest: stringTestReducer,
});

export default reducers;
