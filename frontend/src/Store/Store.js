import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Define your reducers here
const reducer = combineReducers({
  // Add your reducers here
});

// Define the initial state
const initialState = {};

// Create the Redux store using configureStore
const store = configureStore({
  reducer,
  initialState,
});

export default store;
