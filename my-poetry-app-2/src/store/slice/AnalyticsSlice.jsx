import { createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD
import { addLike, addView, getAllAnalytics } from "../thunk/AnalyticsThunk";
=======
// 1. ADD THESE IMPORTS (Adjust the path to where your thunks are)
import { getAllAnalytics, addView, addLike } from "../thunk/AnalyticsThunk";
>>>>>>> 08523790a6aa5f414fb62067d4ce2b7e37bd58cc

const analyticSlices = createSlice({
    name: "analytics", // Changed from "user" to "analytics" for better clarity
    initialState: {
        loading: false,
        addLikeLoading: false,  // Added missing state
        addViewLoading: false,  // Added missing state
        error: null,
        status: null,
        poetryAnalytics: [],
        poetryAnalyticsData: null
    },
    reducers: {
        setPoetryAnalyticsData: (state, action) => {
            const analyticsId = action.payload;
            state.poetryAnalyticsData =
                state.poetryAnalytics.find(
                    (item) => item.id === analyticsId
                ) || null;
        },
    },
    extraReducers(builder) {
        builder
            // GET ALL
            .addCase(getAllAnalytics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllAnalytics.fulfilled, (state, action) => {
                state.loading = false;
                state.poetryAnalytics = action.payload;
            })
            .addCase(getAllAnalytics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(addView.pending, (state) => {
                console.log("addView pending");
                state.addViewLoading = true;
                state.error = null;
            })
            .addCase(addView.rejected, (state, action) => {
                console.log("addView rejected");
                state.addViewLoading = false;
                state.error = action.payload;
            })
            .addCase(addView.fulfilled, (state, action) => {
                console.log("addView fulfilled");
                state.addViewLoading = false;

                const updated = action.payload;

                const index = state.poetryAnalytics.findIndex(
                    (item) => item.id === updated.id
                );
            })

            .addCase(addLike.pending, (state) => {
                console.log("addLike pending");
                state.addLikeLoading = true;
                state.error = null;
            })
            .addCase(addLike.rejected, (state, action) => {
                console.log("addLike rejected");
                state.addLikeLoading = false;
                state.error = action.payload;
            })
            .addCase(addLike.fulfilled, (state, action) => {
                console.log("addLike fulfilled");
                state.addLikeLoading = false;

                const updated = action.payload;

                const index = state.poetryAnalytics.findIndex(
                    (item) => item.id === updated.id
                );

            .addCase(addView.rejected, (state, action) => {
                state.addViewLoading = false;
                state.error = action.payload;
            })

            // ADD LIKE
            .addCase(addLike.pending, (state) => {
                state.addLikeLoading = true;
                state.error = null;
            })
            .addCase(addLike.fulfilled, (state, action) => {
                state.addLikeLoading = false;
                const updated = action.payload;
                const index = state.poetryAnalytics.findIndex(
                    (item) => item.id === updated.id
                );
                if (index !== -1) {
                    state.poetryAnalytics[index] = updated;
                }
            })

            .addCase(addLike.rejected, (state, action) => {
                state.addLikeLoading = false;
                state.error = action.payload;
            });
    }
});

export const { setPoetryAnalyticsData } = analyticSlices.actions;
export const analyticsReducer = analyticSlices.reducer;