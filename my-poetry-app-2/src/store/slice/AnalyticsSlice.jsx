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
    },
    {
        "id": 7,
        "title": "HEllo of the Nightttttt",
        "content": "The moon speaks softly to the lonely\nas\nd\nasd\nas\ndasdas sta\n\ns\ndas\nda\ndas\ndasdasrs...",
        "description": "A reflective poem about solitude and hope.",
        "category": "SAD",
        "dateCreated": "2025-12-29T20:18:11.314114",
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
    },
    {
        "id": 8,
        "title": "Wasalam of the Night",
        "content": "The moon speaks softly to the lonely stars...",
        "description": "A reflective poem about solitude and hope.",
        "category": "SAD",
        "dateCreated": "2025-12-29T20:18:23.306594",
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
        "id": 10,
        "title": "Wasalamaaa of the Night",
        "content": "The moon speaks softly to the lonely stars...",
        "description": "A reflective poem about solitude and hope.",
        "category": "SAD",
        "dateCreated": "2026-01-01T22:36:41.372778",
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
    },
    {
        "id": 11,
        "title": "Wasalamaaa of the Night",
        "content": "The moon speaks softly to the lonely stars...",
        "description": "A reflective poem about solitude and hope.",
        "category": "SAD",
        "dateCreated": "2026-01-01T23:25:37.85385",
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
    },
    {
        "id": 12,
        "title": "qwqw",
        "content": "121212\n1212asas",
        "description": "qwqwwqasas",
        "category": "LIFE",
        "dateCreated": "2026-01-01T23:32:23.586271",
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
    },
    {
        "id": 13,
        "title": "qwqw",
        "content": "121212\n1212asas",
        "description": "qwqwwqasas",
        "category": "LIFE",
        "dateCreated": "2026-01-01T23:32:40.433883",
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
    },
    {
        "id": 14,
        "title": "qwqw",
        "content": "121212\n1212asas",
        "description": "qwqwwqasas",
        "category": "LIFE",
        "dateCreated": "2026-01-01T23:33:40.837074",
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
        "id": 15,
        "title": "qwqw",
        "content": "121212\n1212asas",
        "description": "qwqwwqasas",
        "category": "LIFE",
        "dateCreated": "2026-01-01T23:34:16.15374",
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
        "id": 16,
        "title": "qwqw",
        "content": "121212\n12112122asas",
        "description": "qwqwwqasas",
        "category": "LIFE",
        "dateCreated": "2026-01-01T23:34:19.488438",
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
        "id": 17,
        "title": "qwqw",
        "content": "121212\n12112122asas",
        "description": "qwqwwqasas21212",
        "category": "LIFE",
        "dateCreated": "2026-01-01T23:34:23.130303",
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
        "id": 18,
        "title": "zzzzzzzzzzzzzzzzz",
        "content": "aasas\na\nsa\nsa\ns\na\nsa\nsssaasas\na\nsa\ns\nas\n\n\nas\nas\na\ns\nas",
        "description": "zzzzzzzzzzzzzzz",
        "category": "LIFE",
        "dateCreated": "2026-01-01T23:36:43.778192",
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
        "id": 19,
        "title": "qqqqqqqqqq",
        "content": "aasas\na\nsa\nsa\ns\na\nsa\nsssaasas\na\nsa\ns\nas\n\n\nas\nas\na\ns\nas",
        "description": "zzzzzzzzzzzzzzz",
        "category": "LIFE",
        "dateCreated": "2026-01-01T23:37:06.754985",
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
        "id": 20,
        "title": "qqqqqqqqqq",
        "content": "aasas\na\nsa\nsa\ns\na\nsa\nsssaasas\na\nsa\ns\nas\n\n\nas\nas\na\ns\nas",
        "description": "zzzzzzzzzzzzzzz",
        "category": "LIFE",
        "dateCreated": "2026-01-01T23:38:37.127801",
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
        "id": 21,
        "title": "qqqqqqqqqqzxz",
        "content": "aasas\na\nsa\nsa\ns\na\nsa\nsssaasas\na\nsa\ns\nas\n\n\nas\nas\na\ns\nas",
        "description": "zzzzzzzzzzzzzzzzx",
        "category": "LIFE",
        "dateCreated": "2026-01-01T23:38:41.664896",
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
        "id": 22,
        "title": "qqqqqqqqqqzxz",
        "content": "aasas\na\nsa\nsa\ns\na\nsa\nsssaasas\na\nsa\ns\nas\n\n\nas\nas\na\n\nasas\ns\nas",
        "description": "zzzzzzzzzzzzzzzzx",
        "category": "LIFE",
        "dateCreated": "2026-01-01T23:38:47.592431",
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
        "id": 23,
        "title": "pppppppppp",
        "content": "aasas\na\nsa\nsa\ns\na\nsa\nsssaasas\na\nsa\ns\nas\n\n\nas\nas\na\n\nasas\ns\nas",
        "description": "zzzzzzzzzzzzzzzzx",
        "category": "LIFE",
        "dateCreated": "2026-01-01T23:39:04.399897",
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
        "id": 24,
        "title": "qw",
        "content": "121212",
        "description": "qw",
        "category": "SAD",
        "dateCreated": "2026-01-01T23:42:34.263075",
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
        "id": 25,
        "title": "qw",
        "content": "121212",
        "description": "qw",
        "category": "SAD",
        "dateCreated": "2026-01-01T23:43:28.661554",
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
        "id": 27,
        "title": "tr99999999",
        "content": "rwe",
        "description": "tr",
        "category": "LIFE",
        "dateCreated": "2026-01-01T23:44:02.190057",
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
        "id": 35,
        "title": "naim",
        "content": "qwqw\nq\nw\nqwq\nw\nq\nwq\nw\nq\nwq\nw\n\nqw\nqw\nq\nwq\nw",
        "description": "121212",
        "category": "ROMANTIC",
        "dateCreated": "2026-01-03T03:25:06.019063",
        "status": {
            "id": 1,
            "name": "PENDING"
        },
        "author": {
            "id": 13,
            "publicId": "8539",
            "user": {
                "id": 13,
                "fullName": "Muhamad syafiqqq",
                "email": "nal@mail.com",
                "username": "mail_111129",
                "role": "USER_AUTHOR",
                "createdAt": "2025-12-31T02:22:44.303682"
            },
            "currentDonationBalance": 140.0,
            "bio": "Poetry is my soul12",
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