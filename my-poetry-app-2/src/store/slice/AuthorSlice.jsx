import { createSlice } from "@reduxjs/toolkit";
import { getAllAuthor, updateAuthorStatus } from "../thunk/AuthorThunk";

const AuthorSlice = createSlice({
    name: "author",
    initialState: {
        authorDonationData: null,
        loading: false,
        error: null,
        authorList: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ================= GET AUTHOR DONATION =================
            .addCase(getAllAuthor.pending, (state) => {
                console.log("getAllAuthor pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllAuthor.fulfilled, (state, action) => {
                console.log("getAuthorDonation fulfilled", action.payload);
                state.loading = false;
                state.authorList = action.payload;
            })
            .addCase(getAllAuthor.rejected, (state, action) => {
                console.log("getAllAuthor rejected");
                state.loading = false;
                state.error = action.payload || action.error;
            })

            .addCase(updateAuthorStatus.pending, (state) => {
                console.log("updateAuthorStatus pending");
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(updateAuthorStatus.fulfilled, (state, action) => {
                console.log("updateAuthorStatus fulfilled");
                state.updateLoading = false;
                
                // ✅ Optimistic Update: Find the author in the list and update status
                if (state.authorList) {
                    const updatedAuthor = action.payload; // Assuming API returns the updated author object
                    const index = state.authorList.findIndex(a => a.id === updatedAuthor.id);
                    
                    if (index !== -1) {
                        state.authorList[index] = updatedAuthor;
                    }
                }
            })
            .addCase(updateAuthorStatus.rejected, (state, action) => {
                console.log("updateAuthorStatus rejected");
                state.updateLoading = false;
                state.error = action.payload || action.error;
            });
        
    },
});

export const authorReducer = AuthorSlice.reducer;
