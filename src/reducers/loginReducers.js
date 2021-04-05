import * as types from '../actions/types';
import appState from '../contants/initialState';

const loginReducer = (state = appState.login, action) => {
    switch (action.type) {
        case types.SET_USER_INFO:
            return { ...state, ...{ userInfo: action.data } }
        case types.PROFILE_CHANGES:
            return { ...state, ...{ userInfo: action.data } }
        case types.SELECTED_LOCATION:
            return { ...state, ...{ selectedLocation: action.data } }
        default:
            return state
    }
}
export default loginReducer