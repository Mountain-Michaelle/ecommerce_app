import {combineReducers} from 'redux';
import cart from './cart';
import auth from './auth';
import product from './product';

export default combineReducers({
    cart,
    auth,
    product,
})