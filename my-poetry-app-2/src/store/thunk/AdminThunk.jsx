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
            console.log("1. THUNK RESPONSE:", response.data); 
            
            return response.data; 
        } catch (error) {
            console.error("1. THUNK ERROR:", error.response);
            return rejectWithValue(error.response?.data);
        }
    }
);