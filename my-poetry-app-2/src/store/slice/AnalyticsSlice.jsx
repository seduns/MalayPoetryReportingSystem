import { createSlice } from "@reduxjs/toolkit";
// 1. ADD THESE IMPORTS (Adjust the path to where your thunks are)
import { getAllAnalytics, addView, addLike } from "../thunk/AnalyticsThunk";

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

            // ADD VIEW
            .addCase(addView.pending, (state) => {
                state.addViewLoading = true;
                state.error = null;
            })
            .addCase(addView.fulfilled, (state, action) => {
                state.addViewLoading = false;
                const updated = action.payload;
                const index = state.poetryAnalytics.findIndex(
                    (item) => item.id === updated.id
                );
                if (index !== -1) {
                    state.poetryAnalytics[index] = updated;
                }
            })
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