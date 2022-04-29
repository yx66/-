import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import { isDevMode } from "@/configurations/env";
import appReducers from "./reducers/app.reducer";

const composeEnhancers =
  (isDevMode && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const allReducers = { app: appReducers };

const store = createStore(
  combineReducers(allReducers),
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
