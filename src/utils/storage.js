import { AsyncStorage } from "react-native";
const USER_TOKEN = "USER_TOKEN";
const USER_SETTINGS = "USER_SETTINGS";
const USER_CART = "USER_CART";
const USER = "USER";

/**
 *
 * @param {Number} key the Key of the Item
 * @param {Text} value set the value of the Item
 * @returns return True or False
 */

export const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@${key}:key`, `${value}`);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 *
 * @param {Number} key getting the item with the Key
 * @returns return the item
 */

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(`@${key}:key`);
    if (value !== null) {
      return value;
    }
    return "";
  } catch (error) {
    return "";
  }
};

/**
 * @typedef {Function}
 * @param {Number} value User
 * @returns return True or False
 */
export const setUser = async (value) => {
  try {
    await AsyncStorage.setItem(`@${USER}:key`, `${JSON.stringify(value)}`);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 *
 * @returns return the user
 */

export const getUser = async () => {
  try {
    const value = await AsyncStorage.getItem(`@${USER}:key`);
    if (value !== null) {
      return JSON.parse(value);
    }
    return "";
  } catch (error) {
    return "";
  }
};

/**
 *
 * @param {Number} value
 * @returns return True or false
 */

export const saveToken = async (value) => {
  try {
    await AsyncStorage.setItem(`@${USER_TOKEN}:key`, `${value}`);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 *
 * @returns return empty String
 */

export const clearToken = async () => saveToken("");

/**
 *
 * @returns return undefined, remove the user form the storage
 */
export const clearUser = async () => setUser(undefined);

/**
 *
 * @returns return the token saved in the storage
 */

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem(`@${USER_TOKEN}:key`);
    if (value !== null) {
      return value;
    }
    return "";
  } catch (error) {
    return "";
  }
};

/**
 *
 * @returns return an Object containing the Settings or return null
 */

export const getSettings = async () => {
  try {
    const value = await AsyncStorage.getItem(`@${USER_SETTINGS}:key`);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 *
 * @param {Number} value
 * @returns return True or False
 */

export const saveSettings = async (value) => {
  try {
    await AsyncStorage.setItem(
      `@${USER_SETTINGS}:key`,
      `${JSON.stringify(value)}`
    );
    return true;
  } catch (error) {
    return false;
  }
};

/**
 *
 * @param {Number} value value of the item
 * @returns return True or False
 */
export const saveCart = async (value) => {
  try {
    await AsyncStorage.setItem(`@${USER_CART}:key`, `${JSON.stringify(value)}`);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 *
 * @returns return Object of items or return Null
 */

export const getCart = async () => {
  try {
    const value = await AsyncStorage.getItem(`@${USER_CART}:key`);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 *
 * @returns return empty array, clear the Cart
 */
export const clearCart = async () => saveCart([]);
