import * as types from '../actions/types';
import appState from '../contants/initialState';

const AppReducer = (state = appState.cart, action) => {
    // // console.log('we are in cart reducer')
    switch (action.type) {
        case types.CART_CHANGES:
            return { ...state, ...{ cart: action.data } }
        case types.REFREASH_ORDERS:
            return { ...state, ...{ Refrash: new Date().getTime() } }
        case types.REFREASH_ADDRESS:
            return { ...state, ...{ Refrash: new Date().getTime() } }
        case types.REFREASH_APP:
            return { ...state, ...{ RefrashApp: new Date().getTime() } }
        case types.REFREASH_APP_LOCATION:
            return { ...state, ...{ RefrashAppLocation: new Date().getTime() } }
        case types.REFREASH_NOTIIFCATIONS:
            return { ...state, ...{ RefrashNotifications: new Date().getTime() } }
        case types.REFREASH_HOME:
            return { ...state, ...{ RefrashHome: new Date().getTime() } }
        case types.SELECT_MEAL:
            return { ...state, ...{ selectedProduct: action.data } }
        case types.SELECT_CONSTRAINS:
            return { ...state, ...{ constrains: action.data } }
        case types.SELECTED_CATEGORY:
            return { ...state, ...{ selectedCategory: action.data } }
        case types.SELECTED_ADDRESS:
            return { ...state, ...{ selectedAddress: action.data } }
        case types.SELECTED_SHOP:
            return { ...state, ...{ selectedShop: action.data } }
        case types.HOME_MAHALATY:
            return { ...state, ...{ mainCategories: action.data.mainCategories, categories: action.data.categories, SubCategories: action.data.SubCategories } }
        case types.FCM:
            return { ...state, ...{ fcm: action.data } }
        case types.NOTIFICATIONS_SUCSSESS:
            return { ...state, ...{ totalCount: action.data.totalCount } }
        case types.GUEST_CHECKOUT:
            return { ...state, ...{ GuestCheckoutAddress: action.data } }
        default:
            return state
    }
}
export default AppReducer