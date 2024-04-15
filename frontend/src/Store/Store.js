import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "../Slices/productSlice"; // Importing the reducer, not productSlice

// Define your reducers here
const reducer = combineReducers({
  // Add your reducers here
  product: productReducer.reducer, // Using productReducer as the reducer for the 'product' slice
});

// Define the initial state
const initialState = {};

// Create the Redux store using configureStore
const store = configureStore({
  reducer,
  initialState,
});

export default store;
