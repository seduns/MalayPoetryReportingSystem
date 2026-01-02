import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./store/slice/AuthSlice";
import { poetryReducer } from "./store/slice/PoetrySlice";
import { userReducer } from "./store/slice/UserSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        poetry: poetryReducer,
        user: userReducer
    }
})

export {store}