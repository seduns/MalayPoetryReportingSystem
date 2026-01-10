import { createSlice } from "@reduxjs/toolkit";
import { getAdminPoetryAll, updateAdminStatus } from "../thunk/AdminThunk"; // 1. Added updateAdminStatus import
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
            const poetryId = action.payload;
            state.selectedPoetryData = state.poetryList.find(p => p.id === poetryId) || null;
        }
    },
    extraReducers: (builder) => {
        builder
            // --- Fetch All Admins ---
            .addCase(getAdminPoetryAll.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAdminPoetryAll.fulfilled, (state, action) => {
                state.loading = false;
                state.poetryList = action.payload; 
            })
            .addCase(getAdminPoetryAll.rejected, (state) => {
                state.loading = false;
            })

            // --- Update Admin Status ---
            .addCase(updateAdminStatus.fulfilled, (state, action) => {
                const { adminId, newStatus } = action.payload;
                const adminIndex = state.poetryList.findIndex(item => item.id === adminId);
                if (adminIndex !== -1) {
                    // Convert 'active' back to 'STATUS_ACTIVE' for the UI if necessary
                    const uiStatus = `STATUS_${newStatus.toUpperCase()}`;
                    state.poetryList[adminIndex].status = uiStatus;
                }
            })
            .addCase(updateAdminStatus.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const adminReducer = adminSlice.reducer;