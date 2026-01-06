import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../api/configApi";

export const getAuthorDonation = createAsyncThunk(
    "donation/view",
    async (accountId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${BASEURL}/donation/view/author/${accountId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
);

export const getAllDonationsAdmin = createAsyncThunk(
  "donation/admin/all",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${BASEURL}/donation/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Assuming this returns the array of donations
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch" });
    }
  }
);
