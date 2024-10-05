import {combineReducers} from 'redux';
import cart from './cart';
import auth from './auth';

export default combineReducers({
    cart,
    auth,
})