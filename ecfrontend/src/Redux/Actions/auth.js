import { 
    SIGN_UP_FAIL ,
    SIGN_UP_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    IS_LOADING,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILED,
} from "./types"
import axios from 'axios';

export const loadUser = () => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json'
        }
    }

    const body = JSON.stringify(localStorage.getItem('access'))
    try{
        const res = await axios.post(`${process.env.REACT_APP_AUTH_URL}/account/user/`, body, config)

        if(res?.data){

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: res?.data
        })

        }else{

        dispatch({
            type: LOAD_USER_FAIL,
        })
        }
    } catch(error){
        dispatch({
            type: LOAD_USER_FAIL,
        })
    }
 }

export const sign_up = (name, email, phone, password, re_password) => async dispatch => {
    dispatch({
        type: IS_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'withCrendentials': true
        }
    }

    const body = JSON.stringify({name, email, phone, password, re_password})

    try{
        const res = await axios.post(`${process.env.REACT_APP_AUTH_URL}/account/sign-up/`, body, config)

        if(res?.data){

        dispatch({
            type: SIGN_UP_SUCCESS,
            payload: res?.data
        })

        }else{

        dispatch({
            type: SIGN_UP_FAIL,
        })
        }
    } catch(error){
        dispatch({
            type: SIGN_UP_FAIL,
            payload: error,
        })
    }
 }

 
// LOGIN FUNCTION
export const login = (email, password) => async dispatch => {

    dispatch({
        type: IS_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'withCrendentials': true
        }
    }

    const body = JSON.stringify({email, password})

    try{
        const res = await axios.post(`${process.env.REACT_APP_AUTH_URL}/api/token/`, body, config)

        if(res?.data){

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res?.data,
        })
        // load user after login
        dispatch(loadUser())
    }
    } catch(error){
        if(!error?.response?.data.detail){
            dispatch({
                type: LOGIN_FAILED,
                payload: error
            })
        }else{
            dispatch({
                type: LOGIN_FAILED,
                payload: error?.response?.data.detail
            })
        }
    }
 }

 export const checkAuthentiated = () => async dispatch => {

    if(localStorage.getItem('token')){

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') }`,
                'Accept': 'application/json'
            }
        } 
        const body = JSON.stringify(localStorage.getItem('access'))

    try{
       const res = await axios.post(`${process.env.REACT_APP_AUTH_URL}/account/is-authenticated/`, body, config)

       if (res?.data.isAuthenticated){
            dispatch({
                type: AUTHENTICATION_SUCCESS
            })
            dispatch(loadUser())
       }
       else if(res?.data.code === 'token_not_valid'){
        dispatch({
            type: AUTHENTICATION_FAILED
        })
       }

    }catch(error){
        dispatch({
            type: AUTHENTICATION_FAILED,
            payload: error.response?.data
        })
    }
}
 }
