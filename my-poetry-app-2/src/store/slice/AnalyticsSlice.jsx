import { createSlice } from "@reduxjs/toolkit";
import { addLike, addView, getAdminDashboard, getAllAnalytics, getAuthorDashboard } from "../thunk/AnalyticsThunk";

const analyticSlices = createSlice({
    name: "user",
    initialState: {
        loading: false,
        error: null,
        status: null,
        dashboardData: null,
        poetryAnalytics: [
            {
        "id": 3,
        "title": "Whispers of the Night 222",
        "content": "The moon speaks softly to the lonely stars...",
        "description": "A reflective poem about solitude and hope.",
        "category": "SAD",
        "dateCreated": "2025-12-28T23:13:23.072206",
        "status": {
            "id": 1,
            "name": "PENDING"
        },
        "author": {
            "id": 7,
            "publicId": "5757",
            "user": {
                "id": 7,
                "fullName": "Muhd NAIM Ahmadaa",
                "email": "nalik@example.com",
                "username": "mail_11",
                "role": "USER_AUTHOR",
                "createdAt": "2025-12-28T22:01:38.723742"
            },
            "currentDonationBalance": 191.0,
            "bio": "2222",
            "status": "STATUS_ACTIVE"
        }
    },
    {
        "id": 6,
        "title": "Night of the Night",
        "content": "The moon speaks softly to the lonely stars...",
        "description": "A reflective poem about solitude and hope.",
        "category": "SAD",
        "dateCreated": "2025-12-29T00:03:32.047587",
        "status": {
            "id": 2,
            "name": "APPROVED"
        },
        "author": {
            "id": 7,
            "publicId": "5757",
            "user": {
                "id": 7,
                "fullName": "Muhd NAIM Ahmadaa",
                "email": "nalik@example.com",
                "username": "mail_11",
                "role": "USER_AUTHOR",
                "createdAt": "2025-12-28T22:01:38.723742"
            },
            "currentDonationBalance": 191.0,
            "bio": "2222",
            "status": "STATUS_ACTIVE"
        }
    }
        ],
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
                console.log("getAllAnalytics", action.payload)
                state.loading = false;
                state.poetryAnalytics = action.payload;
                console.log(action.payload)
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

            .addCase(getAdminDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAdminDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboardData = action.payload; // ✅ Data saved here
            })
            .addCase(getAdminDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch dashboard data";
            })

            .addCase(getAuthorDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAuthorDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.authorDashboardData = action.payload; // ✅ Saves the full JSON object here
            })
            .addCase(getAuthorDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch author dashboard";
            });
    }
})

export const { setPoetryAnalyticsData } = analyticSlices.actions;
export const analyticsReducer = analyticSlices.reducer;