import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productCount: 0,
    error:""
  },
  reducers: {
    ALL_PRODUCT_REQUEST: (state) => {
      state.products = [];
    },
    ALL_PRODUCT_SUCCESS: (state, action) => {
      state.products = action.payload.products;
      state.productCount = action.payload.productCount;
    },
    ALL_PRODUCT_FAIL:(state,action)=>{
         state.error=action.payload.error;
    },
    CLEAR_ERRORS:(state)=>{
      state.error=null;
    }
  }
});

export const  {ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS} = productSlice.actions;

export default productSlice; // Exporting the reducer directly
