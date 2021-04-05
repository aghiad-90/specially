import * as types from '../actions/types';
import appState from '../contants/initialState';

const reducer = (state = appState.isConnected, action) => {
    switch (action.type) {
        case types.CHANGE_CONNECTION_STATUS:
            return Object.assign({}, state, {
                isConnected: action.isConnected,
            });
        default:
            return state
    }
}
export default reducer