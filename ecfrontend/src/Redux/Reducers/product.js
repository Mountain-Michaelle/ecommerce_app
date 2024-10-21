import { LOADING, PRODUCT_FAILED, PRODUCT_SUCCESS, PRODUCT_DETAIL_SUCCESS,
     PRODUCT_DETAIL_FAILED, PRODUCT_IMG_SUCCESS, PRODUCT_IMG_FAIL} from "../Actions/types";


const initialState = {
    products: [],
    prod_details: [],
    prod_img:[],
    error: null,
    loading: false,
    status: 'idle',
    detail_status: 'idle',
}


export default function(state=initialState, action){
    const {type, payload} = action;

    switch(type){
        case LOADING:
            return{
                ...state,
                loading: true,
                error: null,
            }

        case PRODUCT_SUCCESS:
            return{
                ...state,
                loading: false,
                products: payload,
                status: 'success',
            }

        case PRODUCT_FAILED:
            return state;

        case PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                prod_details: payload,
                loading: false,
                detail_status: 'success',
            }
        case PRODUCT_DETAIL_FAILED:
            return state;

        case PRODUCT_IMG_SUCCESS:
            return {
                ...state,
                prod_img: payload,
                loading: false,
                detail_status: 'success'
            }
        case PRODUCT_IMG_FAIL:
            return state;

        default:
             return state;
    }
}

