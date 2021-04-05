import { combineReducers } from 'redux';
import loginReducers from './loginReducers';
import AppReducer from './AppReducer';
import connectionReducer from './connectionReducer';

const allReducers = combineReducers({
    login: loginReducers,
    app: AppReducer,
    connection: connectionReducer
})
export default allReducers