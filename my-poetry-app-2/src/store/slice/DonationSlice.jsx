import { createSlice } from "@reduxjs/toolkit";
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

export const donationReducer = donationSlice.reducer;