import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./store/slice/AuthSlice";
import { poetryReducer } from "./store/slice/PoetrySlice";
import { userReducer } from "./store/slice/UserSlice";
import { donationReducer } from "./store/slice/DonationSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        poetry: poetryReducer,
        user: userReducer,
        donation: donationReducer
    }
})

export {store}