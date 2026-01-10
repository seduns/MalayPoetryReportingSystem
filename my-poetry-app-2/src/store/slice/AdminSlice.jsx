import { createSlice } from "@reduxjs/toolkit";
import { getAdminPoetryAll } from "../thunk/AdminThunk";
import { getAllAnalytics } from "../thunk/AnalyticsThunk";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        loading: false,
        error: null,
        status: null,
        poetryList: [], 
        selectedPoetryData: null 
    },
    reducers: {
        setSelectedPoetry: (state, action) => {
            // Find the poetry in our list by the ID passed in payload
            const poetryId = action.payload;
            state.selectedPoetryData = state.poetryList.find(p => p.id === poetryId) || null;
        }
    },
    // adminSlice.js
extraReducers: (builder) => {
  builder
    .addCase(getAdminPoetryAll.pending, (state) => {
      state.loading = true;
    })
    .addCase(getAdminPoetryAll.fulfilled, (state, action) => {
      state.loading = false;
      // This is where the magic happens
      state.poetryList = action.payload; 
    })
    .addCase(getAdminPoetryAll.rejected, (state) => {
      state.loading = false;
    });
}
});

export const adminReducer = adminSlice.reducer;