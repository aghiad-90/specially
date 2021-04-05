import { put, call, fork, takeLatest } from "redux-saga/effects";
import * as types from "../actions/types";
import * as Apis from "../services/Apis";

export function* Constrains(action) {
  try {
    const data = yield call(Apis.fetchConstrains);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchConstrains() {
  yield takeLatest(types.FETCH_CONSTRAINS, Constrains);
}

// Home
export function* Shops(action) {
  try {
    const data = yield call(Apis.filtershops, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchShops() {
  yield takeLatest(types.SHOPS, Shops);
}

// Home
export function* ShopsCategories(action) {
  try {
    const data = yield call(Apis.shopCategories, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchShopsCategories() {
  yield takeLatest(types.SHOP_CATEGORIES, ShopsCategories);
}

// Home
export function* shop(action) {
  try {
    const data = yield call(Apis.shop, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchShop() {
  yield takeLatest(types.SHOP, shop);
}

// Home
export function* Filter(action) {
  try {
    const data = yield call(Apis.fetchFilter, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchFilter() {
  yield takeLatest(types.FETCH_FITERS, Filter);
}

// Home
export function* getproduct(action) {
  try {
    const data = yield call(Apis.getproduct, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchgetproduct() {
  yield takeLatest(types.PRODUCT, getproduct);
}

// ADVERTISING
export function* Advertising(action) {
  try {
    const data = yield call(Apis.fetchAdvertising, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchAdvertising() {
  yield takeLatest(types.FETCH_ADVERTISING, Advertising);
}

// ADVERTISING
export function* fetchNotifications(action) {
  try {
    const data = yield call(Apis.fetchNotifications, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchfetchNOtifications() {
  yield takeLatest(types.FETCH_NOTIFICATIONS, fetchNotifications);
}

// DEAL
export function* Deal(action) {
  try {
    const data = yield call(Apis.fetchDealDetails, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchDealDetails() {
  yield takeLatest(types.FETCH_DEAL_DETAILS, Deal);
}

// COMMENTS
export function* fetchReviews(action) {
  try {
    const data = yield call(Apis.fetchReviews, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchfetchReviews() {
  yield takeLatest(types.FETCH_REVIEWS, fetchReviews);
}

export function* fetchAbout(action) {
  try {
    const data = yield call(Apis.fetchAbout, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchfetchAbout() {
  yield takeLatest(types.FETCH_ABOUT, fetchAbout);
}

// featuredMeals
export function* featuredMeals(action) {
  try {
    const data = yield call(Apis.featuredMeals, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchfeaturedMeals() {
  yield takeLatest(types.FEATURED_MEALS, featuredMeals);
}

// favouriteMeals
export function* favouriteProducts(action) {
  try {
    const data = yield call(Apis.favouriteProducts, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchfavouriteProducts() {
  yield takeLatest(types.FAVOURITE_PRODUCTS, favouriteProducts);
}

// favouriteMeals
export function* getfavouriteProducts(action) {
  try {
    const data = yield call(Apis.getfavouriteProducts, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchgetfavouriteProducts() {
  yield takeLatest(types.GET_FAVOURITE_PRODUCTS, getfavouriteProducts);
}

// favouriteMeals
export function* getfarmers(action) {
  try {
    const data = yield call(Apis.getfarmers, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchgetgetfarmers() {
  yield takeLatest(types.GET_FARMERS, getfarmers);
}

// categories
export function* categories(action) {
  try {
    const data = yield call(Apis.categories, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchcategories() {
  yield takeLatest(types.CATEGORIES, categories);
}

// categories
export function* home(action) {
  try {
    const data = yield call(Apis.home, action.params);
    const dataNews = yield call(Apis.categoryNews);
    action.onSuccess({ data: data.data, dataNews: dataNews });
  } catch (error) {
    action.onError(error);
  }
}

export function* watchhome() {
  yield takeLatest(types.FETCH_HOME, home);
}

// Home
export function* categories_Main_Details(action) {
  try {
    const data = yield call(Apis.categories_Main_Details, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchcategories_Main_Details() {
  yield takeLatest(types.MAIN_CATEGORY_DETAILS, categories_Main_Details);
}

// categories
export function* categories_Sub(action) {
  try {
    const data = yield call(Apis.categories_Sub, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchcategories_Sub() {
  yield takeLatest(types.CATEGORIES_SUB, categories_Sub);
}

// types
export function* type(action) {
  try {
    const data = yield call(Apis.types, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchtypes() {
  yield takeLatest(types.TYPES, type);
}

// fetchFarmerDetails
export function* fetchFarmerDetails(action) {
  try {
    const data = yield call(Apis.fetchFarmerDetails, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchfetchFarmerDetails() {
  yield takeLatest(types.FARMER_DETAILS, fetchFarmerDetails);
}

// fetchKitchens
export function* fetchKitchens(action) {
  try {
    const data = yield call(Apis.fetchKitchens, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchfetchKitchens() {
  yield takeLatest(types.KITCHENS, fetchKitchens);
}

// fetchAllKitchens
export function* fetchAllKitchens(action) {
  try {
    const data = yield call(Apis.fetchAllKitchens, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchfetchAllKitchens() {
  yield takeLatest(types.KITCHENSALL, fetchAllKitchens);
}

// fetchAllKitchens
export function* fetchAllKitchensByLocation(action) {
  try {
    const data = yield call(Apis.fetchAllKitchensByLocation, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchfetchAllKitchensByLocation() {
  yield takeLatest(types.KITCHENSALLNBYLOCATION, fetchAllKitchensByLocation);
}

export function* fetchMealsByKitchan(action) {
  try {
    const data = yield call(Apis.fetchMealsByKitchan, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchfetchMealsByKitchan() {
  yield takeLatest(types.MEALSBYKITCHEN, fetchMealsByKitchan);
}

export function* fetchOrders(action) {
  try {
    const data = yield call(Apis.fetchOrders, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchfetchOrders() {
  yield takeLatest(types.ORDERS, fetchOrders);
}

export function* fetchOrderDeyails(action) {
  try {
    const data = yield call(Apis.fetchOrderDetails, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchfetchOrderDeyails() {
  yield takeLatest(types.ORDERS_DETAILS, fetchOrderDeyails);
}

// categoriesSubCategories
export function* cities(action) {
  try {
    const data = yield call(Apis.cities, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchcities() {
  yield takeLatest(types.CITIES, cities);
}

export function* areas(action) {
  try {
    const data = yield call(Apis.areas, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchareas() {
  yield takeLatest(types.AREAS, areas);
}

// contact u
export function* contactus(action) {
  try {
    const data = yield call(Apis.contactus, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchcontactus() {
  yield takeLatest(types.CONTACTUS, contactus);
}

// LEAVE REVIEW
export function* leaveReview(action) {
  try {
    const data = yield call(Apis.leaveReview, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchleaveReview() {
  yield takeLatest(types.LEAVE_REVIEW, leaveReview);
}

//GET USER ADRESSS
export function* fetchUserAddresses(action) {
  try {
    const data = yield call(Apis.fetchUserAddresses, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchfetchUserAddresses() {
  yield takeLatest(types.GET_USER_ADDRESSES, fetchUserAddresses);
}

// ADD USER ADDRESS
export function* AddUserAddress(action) {
  try {
    const data = yield call(Apis.AddUserAddress, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchAddUserAddress() {
  yield takeLatest(types.ADD_USER_ADDRESS, AddUserAddress);
}

// UPDATE USER ADDRESS
export function* UpdateUserAddress(action) {
  try {
    const data = yield call(Apis.UpdateUserAddress, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchUpdateUserAddress() {
  yield takeLatest(types.UPDATE_USER_ADDRESS, UpdateUserAddress);
}

// DELETE USER ADDRESS
export function* DeleteUserAddress(action) {
  try {
    const data = yield call(Apis.DeleteUserAddress, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchDeleteUserAddress() {
  yield takeLatest(types.DELETE_USER_ADDRESS, DeleteUserAddress);
}

export function* featuredOffers(action) {
  try {
    const data = yield call(Apis.featuredOffers, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchfeaturedOffers() {
  yield takeLatest(types.OFFERS, featuredOffers);
}

export function* featuredSubscripion(action) {
  try {
    const data = yield call(Apis.featuredSubscripion, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchfeaturedSubscripion() {
  yield takeLatest(types.SUBSCRIPION, featuredSubscripion);
}

export function* ConformOrder(action) {
  try {
    const data = yield call(Apis.ConformOrder, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchConformOrder() {
  yield takeLatest(types.CONFIRM_ORDER, ConformOrder);
}

export function* ConformOrderGuest(action) {
  try {
    const data = yield call(Apis.ConformOrderGuest, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchConformOrderGuest() {
  yield takeLatest(types.CONFIRM_ORDER_GUEST, ConformOrderGuest);
}

// UPDATE USER ADDRESS
export function* UpdateorderPayment(action) {
  try {
    const data = yield call(Apis.UpdateorderPayment, action.params);
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* watchUpdateorderPayment() {
  yield takeLatest(types.UPDATE_ORDER, UpdateorderPayment);
}
