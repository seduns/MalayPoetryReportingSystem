import { createSlice } from "@reduxjs/toolkit";
import { getAllAnalytics } from "../thunk/AnalyticsThunk";

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

    }

})

export const { setPoetryAnalyticsData } = analyticSlices.actions;

export const analyticsReducer = analyticSlices.reducer;