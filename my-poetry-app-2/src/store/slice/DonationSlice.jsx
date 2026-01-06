import { createSlice } from "@reduxjs/toolkit";
import { getAuthorDonation, requestWithdraw, makeDonation, getDonationByPoetryId } from "../thunk/DonationThunk";

const donationSlice = createSlice({
    name: "donation",
    initialState: {
        authorDonationData: null,
        loading: false,
        error: null,
        withdrawResult: null,
        donationResult: null,
        donationPoetry: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ================= GET AUTHOR DONATION =================
            .addCase(getAuthorDonation.pending, (state) => {
                console.log("getAuthorDonation pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(getAuthorDonation.fulfilled, (state, action) => {
                console.log("getAuthorDonation fulfilled", action.payload);
                state.loading = false;
                state.authorDonationData = action.payload;
            })
            .addCase(getAuthorDonation.rejected, (state, action) => {
                console.log("getAuthorDonation rejected");
                state.loading = false;
                state.error = action.payload || action.error;
            })

            // ================= REQUEST WITHDRAW =================
            .addCase(requestWithdraw.pending, (state) => {
                console.log("requestWithdraw pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(requestWithdraw.fulfilled, (state, action) => {
                console.log("requestWithdraw fulfilled", action.payload);
                state.loading = false;
                state.withdrawResult = action.payload;
            })
            .addCase(requestWithdraw.rejected, (state, action) => {
                console.log("requestWithdraw rejected");
                state.loading = false;
                state.error = action.payload || action.error;
            })

            // ================= MAKE DONATION =================
            .addCase(makeDonation.pending, (state) => {
                console.log("makeDonation pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(makeDonation.fulfilled, (state, action) => {
                console.log("makeDonation fulfilled", action.payload);
                state.loading = false;
                state.donationResult = action.payload;
            })
            .addCase(makeDonation.rejected, (state, action) => {
                console.log("makeDonation rejected");
                state.loading = false;
                state.error = action.payload || action.error;
            })

            .addCase(getDonationByPoetryId.pending, (state) => {
                console.log("getDonationByPoetryId pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(getDonationByPoetryId.fulfilled, (state, action) => {
                console.log("getDonationByPoetryId fulfilled", action.payload);
                state.loading = false;
                state.donationPoetry = action.payload;
            })
            .addCase(getDonationByPoetryId.rejected, (state, action) => {
                console.log("getDonationByPoetryId rejected");
                state.loading = false;
                state.error = action.payload || action.error;
            })
    },
});

export const donationReducer = donationSlice.reducer;
