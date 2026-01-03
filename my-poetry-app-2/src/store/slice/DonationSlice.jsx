import { createSlice } from "@reduxjs/toolkit";
import { getAuthorDonation } from "../thunk/DonationThunk";

const donationSlice = createSlice({
    name: "donation",
    initialState: {
        authorDonationData: null,
        loading: false,
        error: null,
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(getAuthorDonation.pending, (state) => {
                console.log("getAuthorDonation pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(getAuthorDonation.rejected, (state) => {
                console.log("getAuthorDonation rejected");
                state.loading = false;
            })
            .addCase(getAuthorDonation.fulfilled, (state, action) => {
                state.loading = false;
                console.log("getAuthorDonation fulfilled", action.payload
                    
                );
                state.authorDonationData = action.payload;
            })
    }

})

export const donationReducer = donationSlice.reducer;