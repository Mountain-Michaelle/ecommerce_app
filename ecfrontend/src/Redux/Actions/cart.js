import axios from "axios";
import { 
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    REMOVE_FROM_CART_FAIL,
    REMOVE_FROM_CART_SUCCESS,
    DETAIL_CART_SUCCESS,
    DETAIL_CART_FAIL,
    CART_EXPIRATION,
    SERVER_TIME,
    SERVER_TIME_FAIL,
    ON_PAGE_LOAD,
    SERVER_TIME_NOW,
 } 
    from "./types";


export const cart_time = () => async dispatch => {
    const config = {
        headers: {
            'Accepts': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    try{
    const res = await axios.get(`${process.env.REACT_APP_AUTH_URL}/cart/time/`, config)
    const serverTime = new Date(res.data.serverTime)
    const expirationTime = new Date(res.data.expirationTime)
    localStorage.setItem("expiration_time", expirationTime)
    if (res.data.serverTime){
        dispatch({
            type: SERVER_TIME,
            payload: serverTime.getDate(),
        })  
    }else if(res.data.expirationTime){
        localStorage.setItem("server_expire" , expirationTime)
        dispatch({
            type: CART_EXPIRATION,
            payload: expirationTime
        }) } else{
        dispatch({
        type: SERVER_TIME_FAIL,
        payload: res.data.error
     })
    }
     
    localStorage.setItem("initiated_time", serverTime)

}catch(error){

}}

export const server_time = () => async dispatch => {
    const config = {
        headers: {
            'Accepts': 'application/json',
            'Content-Type': 'application/json',
        }
    }
    try{
        const res = await axios.get(`${process.env.REACT_APP_AUTH_URL}/cart/time/now/`, config)
        const server_time_now = new Date(res.data.server)
        if(res.data){
            dispatch({
                type: SERVER_TIME_NOW,
                payload: server_time_now.getDate(),
            })
        }
    localStorage.setItem("server_time_now", server_time_now)
    }catch(error){
        console.log("error")
    }
}

export const cart_detail = () => async dispatch => {

    const config = {
        headers: {
            'Accepts': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    try{
        const res = axios.get(`${process.env.REACT_APP_AUTH_URL}/cart/detail/`, config)
        if(res.data){
            dispatch({
                type: DETAIL_CART_SUCCESS,
                payload: res.data
            })
        }else{
            dispatch({
                type: DETAIL_CART_FAIL,
                payload: res.data.error,
            })
        }
    }catch(error){
        console.log(error)
    }
}


// export const cart = (product_id, quantity, override)  => async dispatch =>  {
//     // call server time on adding to cart,
//     cart_time()
//     const config = {
//         headers: {
//             'Accepts': 'application/json',
//             'Content-Type': 'application/json',
//         }
//     }

//     const body = JSON.stringify({product_id, quantity, override})

//     try{
//        const res = await axios.post(`${BASE_URL}/cart/add/`, body, config)
//         const {success, error} = res.data;
//         if(res.data){
//             dispatch({
//                 type: ADD_TO_CART_SUCCESS,
//                 payload: res.data,
//             })
//             cart_time()
//             cart_detail()
//         }else{
//             dispatch({
//                 type: ADD_TO_CART_FAIL,
//                 payload: error,
//             })
//         }
//     }
//     catch(error){
//         dispatch({
//             type: ADD_TO_CART_FAIL,
//             payload: console.log(error.response)
//         })
//     }
// }


export const cart_add = (id, title, image, price, quantity, slug) => async dispatch => {
    cart_time()

    if(id){ 
        let items = JSON.parse(localStorage.getItem('items')) || []
        // Add  new items or update existing one
        const existingItemIndex = items.findIndex(item => item.id === id);
        if(existingItemIndex >= 0){
            items[existingItemIndex].quantity = quantity;
        }else{
            items.push({id, title, image, price, quantity, slug})
        }
        localStorage.setItem('items', JSON.stringify(items));

        dispatch({
            type: ADD_TO_CART_SUCCESS,
            item: items
        })

    }else{
        dispatch({
            type: ADD_TO_CART_FAIL,
            item: {}
        })
    }
}

export const cart_remove = (id) => async dispatch => {
    
    let items = JSON.parse(localStorage.getItem('items')) || [];

    if(id){
        const updatedItems = items.filter(item => item.id !== id);
        localStorage.setItem('items', JSON.stringify(updatedItems));
        dispatch({
            type: REMOVE_FROM_CART_SUCCESS,
            id: updatedItems
        })
    }else{
        dispatch({
            type: REMOVE_FROM_CART_FAIL,
            id: {}
        })
    }

}

export const getBasketTotal = (basket) => basket?.reduce((amount, item) => (item.price * item.quantity) + amount, 0);