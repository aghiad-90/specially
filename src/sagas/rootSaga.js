import { all } from 'redux-saga/effects';
import { watchLogin, watchFetchUserInfo, watchfetchUpdateProfile, watchregister, watchsocial, watchfetchUploadProfile } from '../sagas/loginSagas';
import {
    watchAdvertising, watchDealDetails, watchFilter, watchleaveReview, watchcities, watchfetchFarmerDetails, watchfeaturedMeals, watchfetchKitchens, watchfetchAllKitchens, watchfavouriteProducts, watchtypes, watchcontactus, watchfetchAllKitchensByLocation, watchfetchMealsByKitchan, watchfetchOrders, watchfetchOrderDeyails, watchAddUserAddress, watchUpdateUserAddress, watchfetchUserAddresses, watchDeleteUserAddress,
    watchfeaturedOffers, watchConformOrder, watchfeaturedSubscripion, watchfetchNOtifications, watchgetfavouriteProducts, watchgetgetfarmers, watchConstrains, watchShops, watchShop, watchgetproduct, watchShopsCategories, watchfetchReviews, watchConformOrderGuest, watchareas, watchfetchAbout, watchUpdateorderPayment, watchhome
} from './browse';
function* rootSaga() {
    yield all([
        watchLogin(),
        watchregister(),
        watchFetchUserInfo(),
        watchAdvertising(),
        watchDealDetails(),
        watchFilter(),
        watchleaveReview(),
        watchfetchUpdateProfile(),
        watchfetchUploadProfile(),
        watchcities(),
        watchfetchFarmerDetails(),
        watchfeaturedMeals(),
        watchfetchKitchens(),
        watchfetchAllKitchens(),
        watchfavouriteProducts(),
        watchsocial(),
        watchtypes(),
        watchcontactus(),
        watchfetchAllKitchensByLocation(),
        watchfetchMealsByKitchan(),
        watchfetchOrders(),
        watchfetchOrderDeyails(),
        watchfetchUserAddresses(),
        watchAddUserAddress(),
        watchUpdateUserAddress(),
        watchDeleteUserAddress(),
        watchfeaturedOffers(),
        watchConformOrder(),
        watchgetfavouriteProducts(),
        watchfeaturedSubscripion(),
        watchfetchNOtifications(),
        watchgetgetfarmers(),
        watchConstrains(),
        watchShops(),
        watchShop(),
        watchgetproduct(),
        watchShopsCategories(),
        watchfetchReviews(),
        watchConformOrderGuest(),
        watchareas(),
        watchfetchAbout(),
        watchUpdateorderPayment(),
        watchhome()
    ])
}
export default rootSaga