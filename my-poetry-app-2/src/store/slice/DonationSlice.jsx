import { createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD
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
=======
import { getAuthorDonation, getAllDonationsAdmin } from "../thunk/DonationThunk"; // Add import here

const donationSlice = createSlice({
  name: "donation",
  initialState: {
    authorDonationData: null,
    allDonations: [], // <--- Add this to match your component's useSelector
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // Existing Author Cases
      .addCase(getAuthorDonation.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAuthorDonation.fulfilled, (state, action) => {
        state.loading = false;
        state.authorDonationData = action.payload;
      })
      .addCase(getAuthorDonation.rejected, (state) => {
        state.loading = false;
      })

      // ✅ NEW: Admin Cases (This is what was missing!)
      .addCase(getAllDonationsAdmin.pending, (state) => {
        state.loading = true;
        console.log("Admin fetch pending...");
      })
      .addCase(getAllDonationsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.allDonations = action.payload; // Saves data to allDonations
        console.log("Admin fetch fulfilled!", action.payload);
      })
      .addCase(getAllDonationsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("Admin fetch rejected");
      });
  },
});
>>>>>>> ad3cf4307d5aa53c989538a6a0bdba28793bc45a

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
