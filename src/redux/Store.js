import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./auth/Reducer";
import { projectReducer } from "./project/Reducer";
import { chatReducer } from "./chat/Reducer";
import { commentReducer } from "./comment/Reduce";
import { issueReducer } from "./issue/Reducer";
import { subscriptionReducer } from "./subcription/Reducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  chat: chatReducer,
  comment: commentReducer,
  issue: issueReducer,
  subscription: subscriptionReducer,
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
