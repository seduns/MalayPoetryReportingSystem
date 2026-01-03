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