import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../api/configApi";

export const updateAuthorProfile = createAsyncThunk(
    "user/updateprofile",
    async ({accountId, userData}, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.put(`${BASEURL}/author/${accountId}/profile`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
);

export const getAuthorProfile = createAsyncThunk(
    "user/getprofile",
    async ({accountId}, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${BASEURL}/author/${accountId}/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
);
// 1. Get Public Profile (Basic Info) -> {{BASEURL}}/user/8
export const getPublicProfile = createAsyncThunk(
    "user/getPublicProfile",
    async (userId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${BASEURL}/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data; // { id, fullName, email, username, ... }
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch user");
        }
    }
);

// 2. Update Public User -> {{BASEURL}}/user/4/profile
export const updatePublicUser = createAsyncThunk(
    "user/updatePublicUser",
    async ({ userId, userData }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            // Match Postman: PUT to /user/:id/profile
            const response = await axios.put(
                `${BASEURL}/user/${userId}/profile`, 
                userData, // This will now be { email, name, password }
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data || "Update failed");
        }
    }
);


