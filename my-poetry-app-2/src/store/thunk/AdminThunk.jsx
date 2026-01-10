import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../api/configApi";

export const getAdminPoetryAll = createAsyncThunk(
    "admin/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${BASEURL}/admin/all`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            // --- ADD THIS LOG ---
            // console.log("1. THUNK RESPONSE:", response.data); 
            
            return response.data; 
        } catch (error) {
            // console.error("1. THUNK ERROR:", error.response);
            return rejectWithValue(error.response?.data);
        }
    }
);
export const updateAdminStatus = createAsyncThunk(
  "admin/updateStatus",
  async ({ adminId, newStatus }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      
      // Fixed: changed BASE_URL to BASEURL to match your config
      // Fixed: added Authorization headers
      const response = await axios.put(
        `${BASEURL}/status/admin/${adminId}?status=${newStatus}`, 
        {}, // Empty body because you are using query parameters
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Fixed: Return newStatus instead of selectedValue
      return { adminId, newStatus }; 
    } catch (err) {
      console.error("UPDATE ERROR:", err.response);
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);