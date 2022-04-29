import { produce } from "immer";

import { getSafe } from "@/utils";
import { getStorage } from "@/utils/local";
import { defaultAppConfig } from "@/configurations/app";
import { APP_ACTION_TYPES } from "@/store/types/app.type";
import { LOCAL_KEY_CONSTANTS } from "@/constants/local";

const initialState = {
  theme: getStorage(LOCAL_KEY_CONSTANTS.THEME, defaultAppConfig.theme),
  language: getSafe(
    localStorage.getItem(LOCAL_KEY_CONSTANTS.LANGUAGE),
    defaultAppConfig.language
  ),
  token: getStorage(LOCAL_KEY_CONSTANTS.TOKEN),
  routes: getStorage(LOCAL_KEY_CONSTANTS.ROUTES, []),
  userInfo: getStorage(LOCAL_KEY_CONSTANTS.USER_INFO, {}),
};

function appReducers(state = initialState, action) {
  switch (action.type) {
    case APP_ACTION_TYPES.SET_THEME:
      return produce(state, (draftState) => {
        draftState.theme = action.theme;
      });
    case APP_ACTION_TYPES.SET_LANGUAGE:
      return produce(state, (draftState) => {
        draftState.language = action.language;
      });
    case APP_ACTION_TYPES.SET_TOKEN:
      return produce(state, (draftState) => {
        draftState.token = action.token;
      });
    case APP_ACTION_TYPES.SET_USER_INFO:
      return produce(state, (draftState) => {
        draftState.userInfo = action.userInfo;
      });
    case APP_ACTION_TYPES.SET_ROUTES:
      return produce(state, (draftState) => {
        draftState.routes = action.routes;
      });
    default:
      return state;
  }
}

export default appReducers;
