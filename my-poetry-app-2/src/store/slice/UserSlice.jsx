import { createSlice } from "@reduxjs/toolkit";
import { getAuthorProfile, updateAuthorProfile } from "../thunk/UserThunk";

const userSlices = createSlice({
    name: "user",
    initialState: {
        userProfile: null,
        loading: false,
        error: null,
        accountId: null
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(updateAuthorProfile.pending, (state) => {
                console.log("updateAuthorProfile pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAuthorProfile.rejected, (state) => {
                console.log("updateAuthorProfile rejected");
                state.loading = false;
            })
            .addCase(updateAuthorProfile.fulfilled, (state, action) => {
                console.log("updateAuthorProfile fulfilled", action.payload);
                state.loading = false;

                // Pastikan state.userProfile ada value dulu
                if (state.userProfile) {
                    state.userProfile = {
                        ...state.userProfile,
                        bio: action.payload.bio,
                        user: {
                            ...state.userProfile.user,
                            email: action.payload.email,
                            fullName: action.payload.name
                        }
                    };
                }
            })

            .addCase(getAuthorProfile.pending, (state) => {
                console.log("getAuthorProfile pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(getAuthorProfile.rejected, (state) => {
                console.log("getAuthorProfile rejected");
                state.loading = false;
            })
            .addCase(getAuthorProfile.fulfilled, (state, action) => {
                console.log("getAuthorProfile fulfilled", action.payload);
                state.loading = false;
                state.userProfile = action.payload;
            })


    }

})

export const userReducer = userSlices.reducer;