import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import {thunk} from 'redux-thunk';
import combineReducers from './Redux/Reducers';


const initialState = {};

const middleware = [thunk]

let store

if (process.env.NODE_ENV === 'development') {
    store = createStore(
      combineReducers,
      initialState,
      composeWithDevTools(applyMiddleware(...middleware))
    );
  } else {
    store = createStore(
      combineReducers,
      initialState,
      applyMiddleware(...middleware)
    );
  } 

export default store;