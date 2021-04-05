import { put, call, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/types';
import * as Apis from '../services/Apis';
import { setUserInfo } from '../actions/Actions';
import { setToken } from '../services/api';
import { saveToken } from '../utils/storage';


export function ErrorCallback(error, action) {
    if (error.response)
        action.onError(error.response.data)
    else { action.onError({ message: 'Please check your internet connection' }) }
}

// LOGIN
export function* login(action) {
    try {
        const data = yield call(Apis.login, action.params);
        // console.log(data.data);
        action.onSuccess(data.data)
        setToken(data.data.tokens.access.token || '');
        saveToken(data.data.tokens.access.token || '')
        yield put(setUserInfo(data.data.user))
    } catch (error) {
        // console.log('error', error)
        ErrorCallback(error, action)
    }
}

export function* watchLogin() {
    yield takeLatest(types.LOGIN, login)
}

// LOGIN SOCAIL
export function* social(action) {
    try {
        const data = yield call(Apis.social, action.params)
        action.onSuccess(data.data)

        if (data.data.code === 200) {
            setToken(data.data.data.token || '');
            yield put(setUserInfo(data.data.data))
        } else {
            yield put(setUserInfo({ profile: '' }))
        }

    } catch (error) {
        action.onError(error)
    }
}

export function* watchsocial() {
    yield takeLatest(types.SOCIAL, social)
}

// REGISTER
export function* register(action) {
    try {
        const data = yield call(Apis.register, action.params)
        setToken(data.data.tokens.access.token || '');
        saveToken(data.data.tokens.access.token || '')
        yield put(setUserInfo(data.data.user))
        action.onSuccess(data.data)
    } catch (error) {
        ErrorCallback(error, action)
    }
}

export function* watchregister() {
    yield takeLatest(types.REGISTER, register)
}




//GET USER DATA
export function* fetchUserInfo(action) {
    try {
        const data = yield call(Apis.fetchUserInfo)
        action.onSuccess(data.data)
        yield put(setUserInfo(data.data))
    } catch (error) {
        action.onError(error)
    }
}

export function* watchFetchUserInfo() {
    yield takeLatest(types.FETCH_USER_INFO, fetchUserInfo)
}


//UPDATE USER DATA
export function* fetchUpdateProfile(action) {
    try {
        const data = yield call(Apis.updateProfile, action.params)
        // console.log('datadatadatadatadatadatadatadatadatadatadata', data)
        action.onSuccess(data.data)
    } catch (error) {
        // console.log('errorerrorerrorerrorerror', error)
        action.onError(error)
    }
}

export function* watchfetchUpdateProfile() {
    yield takeLatest(types.UPDATE_PROFILE, fetchUpdateProfile)
}


//UPLOAD USER IMAGE
export function* fetchUploadProfile(action) {
    try {
        const data = yield call(Apis.uploadProfile, action.params)
        action.onSuccess(data.data)
    } catch (error) {
        action.onError(error)
    }
}

export function* watchfetchUploadProfile() {
    yield takeLatest(types.UPLOAD_PROFILE, fetchUploadProfile)
}


