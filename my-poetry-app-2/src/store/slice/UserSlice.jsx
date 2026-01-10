import { createSlice } from "@reduxjs/toolkit";
import { getAuthorProfile, getPublicProfile, updateAuthorProfile, updatePublicUser } from "../thunk/UserThunk";

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
            // --- GET PUBLIC PROFILE ---
            .addCase(getPublicProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPublicProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.publicUser = action.payload;
            })
            .addCase(getPublicProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // --- UPDATE PUBLIC USER ---
            .addCase(updatePublicUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })  
            .addCase(updatePublicUser.fulfilled, (state, action) => {
                state.loading = false;
                
                // Merge everything to ensure the UI stays updated
                state.publicUser = {
                    ...state.publicUser,   // Keep existing data (like username if not in payload)
                    ...action.payload,    // Overwrite with new data from server
                    // Normalize the name as we did before
                    fullName: action.payload.name || action.payload.fullName || state.publicUser?.fullName,
                    // Ensure username stays in state
                    username: action.payload.username || state.publicUser?.username 
                };
                
                state.error = null;
            })
            .addCase(updatePublicUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // Don't set publicUser = action.payload here, 
                // we want to keep the old data if the update fails.
});

    }

})

export const userReducer = userSlices.reducer;