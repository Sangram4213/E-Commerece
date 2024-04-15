import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../Slices/productSlice";

export const getProduct = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST }); // Dispatch action type directly
    
      const response = await axios.get('/api/v1/products');
      console.log(response.data);
    
      // Assuming the response data is in the format { success: true, products, productCount }
      const { success, products, productCount } = response.data;
    
      if (success) {
        dispatch({ type: ALL_PRODUCT_SUCCESS, payload: { products, productCount } }); // Dispatch action type with payload
      } else {
        dispatch({ type: ALL_PRODUCT_FAIL, payload: 'Failed to fetch product!' }); // Dispatch action type with error message
      }
    } catch (err) {
      dispatch({ type: ALL_PRODUCT_FAIL, payload: err.response ? err.response.data.message : 'An error occurred' }); // Dispatch action type with error payload
    }
  };

//Clearing Errors
export const  clearErrors= () => async (dispatch) => {
    dispatch(CLEAR_ERRORS());
}