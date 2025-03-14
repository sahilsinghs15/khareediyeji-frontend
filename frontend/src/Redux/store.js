import {configureStore} from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlices.js";
import productSliceReducer from "./Slices/productSlices.js";

const store = configureStore({
    reducer : {
        auth : authSliceReducer,
        productsList : productSliceReducer,
    },
    devTools : true
});

export default store;