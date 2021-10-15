import { combineReducers } from "redux";
import todoListReducer from "./todoListReducer";
import formsReducer from "./formReducer";

const combinedReducer = combineReducers({
  todos: todoListReducer,
  formUI: formsReducer,
});

export default combinedReducer;
