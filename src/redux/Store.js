import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./auth/Reducer";
import { projectReducer } from "./project/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
