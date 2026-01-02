import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../thunk/AuthThunk";

const authSlices = createSlice({
    name: "auth",
    initialState: {
        data: [],
        loading: false,
        error: null,
        logStatus: null,
        accountId: null
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(registerUser.pending, (state) => {
                console.log("registerUser pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log("registerUser rejected");
                state.loading = false;
                console.log("here: ", action)
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log("registerUser fulfilled", action.payload);
                state.loading = false;
                state.accountId = action.payload.accountId;
            })
            
            .addCase(loginUser.pending, (state) => {
                console.log("loginUser pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log("loginUser rejected");
                state.loading = false;
                state.error = action.payload?.message || "Login failed.";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("loginUser fulfilled", action);
                state.loading = false;
                state.accountId = action.payload.accountId;
            });

    }

})

export const authReducer = authSlices.reducer;