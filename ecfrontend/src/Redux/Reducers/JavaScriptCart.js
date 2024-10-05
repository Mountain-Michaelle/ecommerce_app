import { 
    ADD_TO_CART_SUCCESS, 
    ADD_TO_CART_FAIL,
    REMOVE_FROM_cART_SUCCESS,
} from "../Actions/types";


const initialState = {
    basket: []
}


export default function(state=initialState, action){
    const {type, payload} = action
    switch(type){
        case ADD_TO_CART_SUCCESS:
        return{
            ...state,
            basket: [...state.basket, action.item]
        }

    case REMOVE_FROM_cART_SUCCESS:
        const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            )
        let newBaske = [...state.basket];
        if(index >= 0){
            newBaske.splice(index, 1)
        }else{
            console.warn("Not in the cart")
        }
        return{
            ...state,
            basket: newBaske
        }
        
    default:
        return state;
    }
}