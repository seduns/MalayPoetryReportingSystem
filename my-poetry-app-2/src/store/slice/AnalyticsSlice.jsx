import { createSlice } from "@reduxjs/toolkit";
import { addLike, addView, getAllAnalytics } from "../thunk/AnalyticsThunk";

const analyticSlices = createSlice({
    name: "user",
    initialState: {
        loading: false,
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
            .addCase(getAllAnalytics.pending, (state) => {
                console.log("getAllAnalytics pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllAnalytics.rejected, (state) => {
                console.log("getAllAnalytics rejected");
                state.loading = false;
            })
            .addCase(getAllAnalytics.fulfilled, (state, action) => {
                console.log("getAllAnalytics fulfilled", action.payload);
                state.loading = false;
                state.poetryAnalytics = action.payload;
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

                if (index !== -1) {
                    state.poetryAnalytics[index] = updated;
                }
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

                if (index !== -1) {
                    state.poetryAnalytics[index] = updated;
                }
            })

    }

})

export const { setPoetryAnalyticsData } = analyticSlices.actions;

export const analyticsReducer = analyticSlices.reducer;

