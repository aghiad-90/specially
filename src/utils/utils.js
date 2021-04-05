import { showMessage } from "react-native-flash-message";
import { Dimensions } from "react-native";
import i18n from "i18n-js";
import { I18nManager } from "react-native";
import { Popup } from "../components/popup-ui";

/**
 *
 * @returns return the size of the Device
 */

export const iPhoneSize = () => {
  const windowWidth = Dimensions.get("window").width;
  if (windowWidth === 320) {
    return "small"; // iPhone SE
  }
  if (windowWidth === 414) {
    return "large"; // iPhone Plus
  }
  return "medium"; // iPhone 6/7
};

/**
 *
 */

export const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  ar: () => require("../translations/ar.json"),
  en: () => require("../translations/en.json"),
};

// export const translate = memoize(
//     (key, config) => i18n.t(key, config),
//     (key, config) => (config ? key + JSON.stringify(config) : key)
// );
export const translate = (key) => {
  return key;
};

export const setI18nConfig = (language) => {
  // fallback if no available language fits
  // let rtl = false;
  // if (language != 'en') {
  //     rtl = true;
  // }
  // const fallback = { languageTag: language, isRTL: rtl };
  // // const fallback = { languageTag: "en", isRTL: false };
  // const { languageTag, isRTL } = fallback;
  // // clear translation cache
  // translate.cache.clear();
  // // update layout direction
  // I18nManager.forceRTL(isRTL);
  // // set i18n-js config
  // i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  // i18n.locale = languageTag;
};

/**
 * @typedef {Function}
 * @param {Text} message
 */

export const showDanger = (message) => {
  showMessage({
    message: message,
    type: "danger",
    position: "top",
    animated: true,
    floating: false,
    duration: 1000,
  });
};

/**
 * @typedef {Function}
 * @param {Text} message
 */

export const showDangerTop = (message) => {
  showMessage({
    message: message,
    type: "danger",
    animated: true,
    floating: false,
    duration: 1000,
  });
};

/**
 * @typedef {Function}
 * @param {Text} message
 */
export const showSuccess = (message) => {
  showMessage({
    message: message,
    type: "success",
    position: "top",
    animated: true,
    duration: 1000,
  });
};

/**
 * @typedef {Function}
 * @param {Text} message
 */
export const showInfo = (message) => {
  showMessage({
    message: message,
    type: "info",
    position: "bottom",
    animated: true,
    floating: true,
    duration: 1000,
  });
};

/**
 * @typedef {Function}
 * @param {Text} message
 * @param {Text} heading
 * @param {Image} image
 */

export const showSuccessPopup = (message, heading, image) => {
  Popup.show({
    type: "Success",
    title: heading,
    button: true,
    textBody: message,
    buttonText: "Ok",
    duration: 1500,
    iamge: image,
    callback: () => Popup.hide(),
  });
};

/**
 * @typedef {Function}
 * @param {Text} message
 * @param {Text} heading
 * @param {Image} image
 */

export const showErrorPopup = (message, heading, image) => {
  Popup.show({
    type: "Success",
    title: heading,
    button: true,
    textBody: message,
    buttonText: "Ok",
    duration: 1500,
    iamge: image,
    callback: () => {
      Popup.hide();
    },
  });
};
