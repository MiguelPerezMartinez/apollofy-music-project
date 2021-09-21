import { combineReducers } from "redux";
import stringTestReducer from "./stringTest/reducer";

const reducers = combineReducers({
  stringTest: stringTestReducer,
});

export default reducers;
