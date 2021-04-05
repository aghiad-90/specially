import {
  LOGIN,
  SOCIAL,
  SET_USER_INFO,
  FETCH_USER_INFO,
  FETCH_HOME,
  RESETPASSWORD,
  SELECTED_LOCATION,
  CONTACTUS,
  HOME_MAHALATY,
  FETCH_NOTIFICATIONS,
  SELECTED_CATEGORY,
  FETCH_ADVERTISING,
  REGISTER,
  FARMER_DETAILS,
  FEATURED_MEALS,
  CATEGORIES,
  KITCHENS,
  UPLOAD_PROFILE,
  PROFILE_CHANGES,
  REFREASH_ORDERS,
  CONFIRM_ORDER,
  GET_FAVOURITE_PRODUCTS,
  UPDATE_PROFILE,
  FETCH_USER_PURCHASE,
  FETCH_DEAL_DETAILS,
  SEND_EMAIL_FORGET,
  TYPES,
  GET_FARMERS,
  CHANGE_CONNECTION_STATUS,
  MEALSBYKITCHEN,
  LEAVE_REVIEW,
  REFREASH_ADDRESS,
  OFFERS,
  SUBSCRIPION,
  EMAIL_VERIFICATION,
  RESEND_CODE,
  FETCH_FITERS,
  CATEGORIES_SUB,
  MAIN_CATEGORY_DETAILS,
  REFREASH_NOTIIFCATIONS,
  REFREASH_HOME,
  SELECTED_SHOP,
  SHOP,
  CONFIRM_ORDER_GUEST,
  UPDATE_ORDER,
  NOTIFICATIONS_SUCSSESS,
  GUEST_CHECKOUT,
  FCM,
  FETCH_ABOUT,
  SELECT_CONSTRAINS,
  CART_CHANGES,
  REFREASH_APP,
  REFREASH_APP_LOCATION,
  FETCH_CONSTRAINS,
  FETCH_REVIEWS,
  SENDOTPBYEMAIL,
  KITCHENSALL,
  FAVOURITE_PRODUCTS,
  SELECT_MEAL,
  KITCHENSALLNBYLOCATION,
  ORDERS,
  ORDERS_DETAILS,
  GET_USER_ADDRESSES,
  ADD_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
  DELETE_USER_ADDRESS,
  CITIES,
  SELECTED_ADDRESS,
  SHOPS,
  PRODUCT,
  SHOP_CATEGORIES,
  AREAS,
} from "./types";

/**
 *
 * @param {boolean} status the status of current Connection
 * @returns Object
 */

export const connectionState = ({ status }) => {
  return { type: CHANGE_CONNECTION_STATUS, isConnected: status };
};

/**
 * @typedef {Funciton}
 * @param {Object} params
 * @param {Funciton} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const login = (params, onSuccess, onError) => ({
  type: LOGIN,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Funciton}
 * @param {Object} params
 * @param {Funciton} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const social = (params, onSuccess, onError) => ({
  type: SOCIAL,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Funciton}
 * @param {Object} params
 * @param {Funciton} onSuccess
 * @param {Function} onError
 * @returns Object
 */
export const register = (params, onSuccess, onError) => ({
  type: REGISTER,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Funciton}
 * @param {Object} params
 * @param {Funciton} onSuccess
 * @param {Function} onError
 * @returns Object
 */
export const verifyEmail = (params, onSuccess, onError) => ({
  type: EMAIL_VERIFICATION,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Funciton}
 * @param {Object} params
 * @param {Funciton} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const resetPassword = (params, onSuccess, onError) => ({
  type: RESETPASSWORD,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Funciton}
 * @param {Object} params
 * @param {Funciton} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const sendEmail = (params, onSuccess, onError) => ({
  type: SEND_EMAIL_FORGET,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Funciton}
 * @param {Object} params
 * @param {Funciton} onSuccess
 * @param {Function} onError
 * @returns Object
 */
export const sentOtpByEmail = (params, onSuccess, onError) => ({
  type: SENDOTPBYEMAIL,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Funciton}
 * @param {Funciton} onSuccess
 * @param {Function} onError
 * @returns Object
 */
export const resendCode = (onSuccess, onError) => ({
  type: RESEND_CODE,
  onSuccess,
  onError,
});

/**
 * @typedef {Funciton}
 * @param {Object} data
 * @returns Object
 */
export const setUserInfo = (data) => ({
  type: SET_USER_INFO,
  data,
});

/**
 * @typedef {Funciton}
 * @param {Object} data
 * @returns Object
 */
export const setCartUpdates = (data) => ({
  type: CART_CHANGES,
  data,
});

/**
 * @typedef {Funciton}
 * @param {Object} data
 * @returns Object
 */
export const homeMahalaty = (data) => ({
  type: HOME_MAHALATY,
  data,
});

/**
 * @typedef {Funciton}
 * @param {Object} data
 * @returns Object
 */

export const setselectedProduct = (data) => ({
  type: SELECT_MEAL,
  data,
});

/**
 * @typedef {Funciton}
 * @param {Object} data
 * @returns Object
 */
export const setConstrains = (data) => ({
  type: SELECT_CONSTRAINS,
  data,
});

/**
 * @typedef {Funciton}
 * @param {Object} data
 * @returns Object
 */
export const setSelectedAddress = (data) => ({
  type: SELECTED_ADDRESS,
  data,
});

/**
 * @typedef {Funciton}
 * @param {Object} data
 * @returns Object
 */
export const setSelectedCategory = (data) => ({
  type: SELECTED_CATEGORY,
  data,
});

/**
 * @typedef {Funciton}
 * @param {Object} data
 * @returns Object
 */
export const setSelectedShop = (data) => ({
  type: SELECTED_SHOP,
  data,
});

/**
 * @typedef {Funciton}
 * @param {Object} data
 * @returns Object
 */
export const refreashOrder = (data) => ({
  type: REFREASH_ORDERS,
  data,
});

/**
 * @typedef {Funciton}
 * @param {Object} data
 * @returns Object
 */
export const refreashApp = (data) => ({
  type: REFREASH_APP,
  data,
});

/**
 * @typedef {Funciton}
 * @param {Object} data
 * @returns Object
 */
export const refreashAppLocation = (data) => ({
  type: REFREASH_APP_LOCATION,
  data,
});

/**
 * @typedef {Funciton}
 * @param {Object} data
 * @returns Object
 */

export const refreashAddress = (data) => ({
  type: REFREASH_ADDRESS,
  data,
});

/**
 * @typedef {Funciton}
 * @param {Object} data
 * @returns Object
 */
export const setProfileUpdates = (data) => ({
  type: PROFILE_CHANGES,
  data,
});

/**
 * @typedef {Funciton}
 * @param {Object} data
 * @returns Object
 */
export const setdefaultLocation = (data) => ({
  type: SELECTED_LOCATION,
  data,
});

/**
 * @typedef {Funciton}
 * @param {Funciton} onSuccess
 * @param {Funciton} onError
 * @returns Object
 */

export const fetchUserInfo = (onSuccess, onError) => ({
  type: FETCH_USER_INFO,
  onSuccess,
  onError,
});

/**
 *  @typedef {Funciton}
 * @param {Funciton} onSuccess
 * @param {Funciton} onError
 * @returns Object
 */
export const fetchUserPurchase = (onSuccess, onError) => ({
  type: FETCH_USER_PURCHASE,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Funciton} onSuccess
 * @param {Funciton} onError
 * @returns Object
 */

export const fetchHome = (params, onSuccess, onError) => ({
  type: FETCH_HOME,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const fetchConstrains = (onSuccess, onError) => ({
  type: FETCH_CONSTRAINS,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const fetchFilter = (params, onSuccess, onError) => ({
  type: FETCH_FITERS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const getproduct = (params, onSuccess, onError) => ({
  type: PRODUCT,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const fetchAbout = (params, onSuccess, onError) => ({
  type: FETCH_ABOUT,
  onSuccess,
  params,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const UpdateorderPayment = (params, onSuccess, onError) => ({
  type: UPDATE_ORDER,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const fetchShops = (params, onSuccess, onError) => ({
  type: SHOPS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const fetchShop = (params, onSuccess, onError) => ({
  type: SHOP,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const fetchShopCategories = (params, onSuccess, onError) => ({
  type: SHOP_CATEGORIES,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const fetchMinaCategoryDetails = (params, onSuccess, onError) => ({
  type: MAIN_CATEGORY_DETAILS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const fetchAdvertising = (onSuccess, onError) => ({
  type: FETCH_ADVERTISING,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const fetchDealDetails = (params, onSuccess, onError) => ({
  type: FETCH_DEAL_DETAILS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const fetchReviews = (params, onSuccess, onError) => ({
  type: FETCH_REVIEWS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const updateProfile = (params, onSuccess, onError) => ({
  type: UPDATE_PROFILE,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const uploadProfile = (params, onSuccess, onError) => ({
  type: UPLOAD_PROFILE,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const categories = (params, onSuccess, onError) => ({
  type: CATEGORIES,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const categories_Sub = (params, onSuccess, onError) => ({
  type: CATEGORIES_SUB,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const types = (onSuccess, onError) => ({
  type: TYPES,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const fetchFarmerDetails = (params, onSuccess, onError) => ({
  type: FARMER_DETAILS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const fetchKitchens = (params, onSuccess, onError) => ({
  type: KITCHENS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const cities = (onSuccess, onError) => ({
  type: CITIES,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const areas = (params, onSuccess, onError) => ({
  type: AREAS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const fetchAllKitchens = (params, onSuccess, onError) => ({
  type: KITCHENSALL,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const getByKitchen = (params, onSuccess, onError) => ({
  type: MEALSBYKITCHEN,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const fetchAllKitchensByLocation = (params, onSuccess, onError) => ({
  type: KITCHENSALLNBYLOCATION,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const featuredMeals = (params, onSuccess, onError) => ({
  type: FEATURED_MEALS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const ConformOrder = (params, onSuccess, onError) => ({
  type: CONFIRM_ORDER,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const ConformOrderGuest = (params, onSuccess, onError) => ({
  type: CONFIRM_ORDER_GUEST,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const fetchOrders = (params, onSuccess, onError) => ({
  type: ORDERS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const fetchOrderDetails = (params, onSuccess, onError) => ({
  type: ORDERS_DETAILS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const favouriteProducts = (params, onSuccess, onError) => ({
  type: FAVOURITE_PRODUCTS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const getfavouriteProducts = (params, onSuccess, onError) => ({
  type: GET_FAVOURITE_PRODUCTS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const getfarmers = (params, onSuccess, onError) => ({
  type: GET_FARMERS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const contactus = (params, onSuccess, onError) => ({
  type: CONTACTUS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const leaveReview = (params, onSuccess, onError) => ({
  type: LEAVE_REVIEW,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const fetchUserAddresses = (params, onSuccess, onError) => ({
  type: GET_USER_ADDRESSES,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const AddUserAddress = (params, onSuccess, onError) => ({
  type: ADD_USER_ADDRESS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const UpdateUserAddress = (params, onSuccess, onError) => ({
  type: UPDATE_USER_ADDRESS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const deleteAddress = (params, onSuccess, onError) => ({
  type: DELETE_USER_ADDRESS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const featuredOffers = (params, onSuccess, onError) => ({
  type: OFFERS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const featuredSubscripion = (params, onSuccess, onError) => ({
  type: SUBSCRIPION,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} params
 * @param {Function} onSuccess
 * @param {Function} onError
 * @returns Object
 */

export const fetchNotifications = (params, onSuccess, onError) => ({
  type: FETCH_NOTIFICATIONS,
  params,
  onSuccess,
  onError,
});

/**
 * @typedef {Function}
 * @param {Object} data
 * @returns Object
 */

export const setFcm = (data) => ({
  type: FCM,
  data,
});

/**
 * @typedef {Function}
 * @param {Object} data
 * @returns Object
 */

export const GuestCheckourAddress = (data) => ({
  type: GUEST_CHECKOUT,
  data,
});

/**
 * @typedef {Function}
 * @param {Object} data
 * @returns Object
 */

export const NotificationCount = (data) => ({
  type: NOTIFICATIONS_SUCSSESS,
  data,
});

/**
 * @typedef {Function}
 * @param {Object} data
 * @returns Object
 */

export const refreashNotifications = (data) => ({
  type: REFREASH_NOTIIFCATIONS,
  data,
});

/**
 * @typedef {Function}
 * @param {Object} data
 * @returns Object
 */
export const refreashHome = (data) => ({
  type: REFREASH_HOME,
  data,
});
