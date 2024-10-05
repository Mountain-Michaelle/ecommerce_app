import { 
    ADD_TO_CART_SUCCESS, 
    ADD_TO_CART_FAIL,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAIL,
    DETAIL_CART_SUCCESS,
    DETAIL_CART_FAIL,
    CART_EXPIRATION,
    SERVER_TIME,
    ON_PAGE_LOAD,
    SERVER_TIME_FAIL,
    SERVER_TIME_NOW,
} from "../Actions/types";

const initialState = {
    basket: JSON.parse(localStorage.getItem('items')) || [],
    success: '',
    error: '',
    serverTime: '',
    cart_expiration: '',
    server_time_now: '',
}


export default function(state=initialState, action){
    const {type, payload} = action;

    switch(type){

        case SERVER_TIME_NOW:
            return{
                ...state,
                server_time_now: payload
            }

        case SERVER_TIME:
            return{
                ...state,
                serverTime: payload,
            }
        
        case CART_EXPIRATION:
            return{
                ...state,
                cart_expiration: console.log(payload, "what happened")
            }
        case ADD_TO_CART_SUCCESS:
            const items = JSON.parse(localStorage.getItem('items'))
                return{
                ...state,
                basket: items,
                error: '',
            }
        
        case REMOVE_FROM_CART_SUCCESS:
            const remove = JSON.parse(localStorage.getItem('items'))
            return{
                ...state,
                basket: remove,
            }

        case REMOVE_FROM_CART_FAIL:
            return{
                ...state,
                basket: payload
            }
        case ADD_TO_CART_FAIL:
            return{
                ...state,
                error: payload
            }

        case DETAIL_CART_SUCCESS:
            return{
                ...state,
                basket: payload
            }
        
        case DETAIL_CART_FAIL:
            return{
                ...state,
                basket: "",
                error: payload
            }

        default:
            return state;
    }
}
