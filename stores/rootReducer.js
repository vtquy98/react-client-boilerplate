import { reducers as apiReducers } from "redux-api-call";
import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
import userState from "./userState";
export default combineReducers({
  ...apiReducers,
  ...userState
});
