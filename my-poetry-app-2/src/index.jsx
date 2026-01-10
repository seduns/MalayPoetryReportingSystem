import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./store/slice/AuthSlice";
import { poetryReducer } from "./store/slice/PoetrySlice";
import { userReducer } from "./store/slice/UserSlice";
import { donationReducer } from "./store/slice/DonationSlice";
import { coauthorReducer } from "./store/slice/CoauthorSlice";
import { analyticsReducer } from "./store/slice/AnalyticsSlice";
import { authorReducer } from "./store/slice/AuthorSlice";
import { adminReducer } from "./store/slice/AdminSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        poetry: poetryReducer,
        user: userReducer,
        donation: donationReducer,
        coauthor: coauthorReducer,
        analytics: analyticsReducer,
        author: authorReducer,
        admin: adminReducer
    }
})

export {store}