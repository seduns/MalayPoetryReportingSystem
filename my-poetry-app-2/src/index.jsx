import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./store/slice/AuthSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        // cart: cartReducer
    }
})

export {store}