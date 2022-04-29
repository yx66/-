import CryptoJS from "crypto-js";

import { STORAGE_AES_CONSTANT } from "@/constants/app";
import { defaultAppConfig } from "@/configurations/app";

export function saveStorage(key, data, autoStringIfy = true) {
  const localFunc = defaultAppConfig.localSessionStorage.includes(key)
    ? sessionStorage
    : localStorage;

  try {
    const dataEncrypted = CryptoJS.AES.encrypt(
      autoStringIfy && typeof data === "object" ? JSON.stringify(data) : data,
      STORAGE_AES_CONSTANT
    ).toString();
    localFunc.setItem(key, dataEncrypted);
  } catch (err) {
    console.error("save local error", err);
  }
}

export function getStorage(key, defaultValue = "", autoParse = true) {
  const localFunc = defaultAppConfig.localSessionStorage.includes(key)
    ? sessionStorage
    : localStorage;

  const rawData = localFunc.getItem(key);
  if (!rawData) return defaultValue;

  try {
    const dataDecrypted = CryptoJS.AES.decrypt(
      rawData,
      STORAGE_AES_CONSTANT
    ).toString(CryptoJS.enc.Utf8);

    if (autoParse) {
      try {
        return JSON.parse(dataDecrypted);
      } catch (err) {
        return dataDecrypted;
      }
    } else {
      return dataDecrypted;
    }
  } catch (err) {
    console.error("get local error", err);
    return defaultValue;
  }
}

export function removeStorage(key) {
  const localFunc = defaultAppConfig.localSessionStorage.includes(key)
    ? sessionStorage
    : localStorage;
  return localFunc.removeItem(key);
}
