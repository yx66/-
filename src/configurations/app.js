import { LANGUAGE_CONSTANTS, THEME_CONSTANTS } from "@/constants/app";
import { LOCAL_KEY_CONSTANTS } from "@/constants/local";

export const defaultAppConfig = {
  theme: THEME_CONSTANTS.LIGHT,
  language: LANGUAGE_CONSTANTS.EN_US,
  localSessionStorage: [
    LOCAL_KEY_CONSTANTS.TOKEN,
    LOCAL_KEY_CONSTANTS.ROUTES,
    LOCAL_KEY_CONSTANTS.USER_INFO,
  ],
};
