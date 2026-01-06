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
            // The payload passed is the POETRY ID (e.g., 12)
            const poetryId = action.payload;

            state.poetryAnalyticsData =
                state.poetryAnalytics.find(
                    // FIX: Look at item.poetry.id, not item.id
                    (item) => item.poetry.id === poetryId
                ) || null;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getAllAnalytics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllAnalytics.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getAllAnalytics.fulfilled, (state, action) => {
                state.loading = false;
                state.poetryAnalytics = action.payload;
            })

            .addCase(addView.pending, (state) => {
                console.log("addView pending");
                state.error = null;
            })
            .addCase(addView.rejected, (state, action) => {
                console.log("addView rejected", action);
                state.error = action.payload;
            })
            .addCase(addView.fulfilled, (state, action) => {
                console.log("success");

                // Note: Although we call it 'analyticsId' here because of the thunk definition,
                // effectively it is the POETRY ID (e.g., 12) that was passed from the component.
                const { analyticsId: poetryId } = action.payload;

                // 1. Update Main List
                // FIX: Check item.poetry.id instead of item.id
                const index = state.poetryAnalytics.findIndex(
                    (item) => item.poetry.id === poetryId
                );

                if (index !== -1) {
                    state.poetryAnalytics[index].viewCount += 1;
                }

                // 2. Update Detail Page Data (if matches)
                // FIX: Check state.poetryAnalyticsData.poetry.id
                if (state.poetryAnalyticsData && state.poetryAnalyticsData.poetry.id === poetryId) {
                    state.poetryAnalyticsData.viewCount += 1;
                }
            })

            .addCase(addLike.pending, (state) => {
                state.error = null;
            })
            .addCase(addLike.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(addLike.fulfilled, (state, action) => {
                console.log("success like");
                const updated = action.payload; // Verify your addLike thunk structure!
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