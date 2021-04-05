import { combineReducers } from "redux";
import loginReducers from "./loginReducers";
import AppReducer from "./AppReducer";
import connectionReducer from "./connectionReducer";

/**
 * Combine all reducers in one
 */

const allReducers = combineReducers({
  login: loginReducers,
  app: AppReducer,
  connection: connectionReducer,
});
export default allReducers;
