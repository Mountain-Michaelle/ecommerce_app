import axios from "axios";
import { LOADING, PRODUCT_SUCCESS, PRODUCT_FAILED,
PRODUCT_DETAIL_FAILED, PRODUCT_DETAIL_SUCCESS, PRODUCT_IMG_FAIL, PRODUCT_IMG_SUCCESS } from "./types";



export const product_details = (slug) => async dispatch => {
   dispatch({
    type: LOADING
   })

    try{
        const res = await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/shop/product/${slug}/`)
        const img_res = await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/shop/product/${slug}/images/`);

        if(img_res?.data){
            dispatch({
                type: PRODUCT_IMG_SUCCESS,
                payload: img_res?.data
            })
        }else{
            dispatch({
                type: PRODUCT_IMG_FAIL
            })
        }

        if(res.data){
            dispatch({ 
                type: PRODUCT_DETAIL_SUCCESS,
                payload: res.data,
            })
        }else{
            dispatch()
        }
    }
    catch(error){
        dispatch({
            type: PRODUCT_DETAIL_FAILED,
            payload: error,
        })
    }
}

export const product = () => async dispatch => {
    dispatch({
     type: LOADING
    })
    
     try{
         const res = await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/shop/products/`)
         if(res.status==200){
             dispatch({
                 type: PRODUCT_SUCCESS,
                 payload: res?.data
             })
         }else{
             dispatch({
                 type: PRODUCT_FAILED
             })
         }
     }
     catch(error){
         dispatch({
             type: PRODUCT_FAILED,
             payload: error,
         })
     }
 }