import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import LANGUAGES_EN_US from "./modules/en-US.json";
import LANGUAGES_ZH_CN from "./modules/zh-CN.json";
import LANGUAGES_ZH_HK from "./modules/zh-HK.json";
import { isDevMode } from "@/configurations/env";
import { defaultAppConfig } from "@/configurations/app";
import { LANGUAGE_CONSTANTS } from "@/constants/app";
import { LOCAL_KEY_CONSTANTS } from "@/constants/local";

const resources = {
  [LANGUAGE_CONSTANTS.EN_US]: { translation: LANGUAGES_EN_US },
  [LANGUAGE_CONSTANTS.ZH_CN]: { translation: LANGUAGES_ZH_CN },
  [LANGUAGE_CONSTANTS.ZH_HK]: { translation: LANGUAGES_ZH_HK },
};

i18n
  .use(
    new LanguageDetector(null, {
      lookupLocalStorage: LOCAL_KEY_CONSTANTS.LANGUAGE,
    })
  )
  .use(initReactI18next)
  .init({
    resources,
    debug: isDevMode,
    lng: defaultAppConfig.language,
    fallbackLng: LANGUAGE_CONSTANTS.EN_US,
    detection: { caches: ["localStorage"] },
  });

export default i18n;
