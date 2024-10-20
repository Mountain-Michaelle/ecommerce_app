import { 
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    REMOVE_FROM_cART_FAIL,
    REMOVE_FROM_cART_SUCCESS,
 } 
    from "./types";


export const cart = (id, title, rating, description, price) => async dispatch => {
    if(id){
        dispatch({
            type: ADD_TO_CART_SUCCESS,
            item: {
                id:id,
                title:title,
                price:price,
                rating:rating,
                description:description,
            }
        })
    }else{
        dispatch({
            type: ADD_TO_CART_FAIL,
            item: {
                id:'',
                title:'',
                price:'',
                rating:'',
                description:'',
            }
        })
    }
}

export const cart_remove = (id) => async dispatch => {
    if(id){
        dispatch({
            type: REMOVE_FROM_cART_SUCCESS,
            id: id
        })
    }
}

export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0);