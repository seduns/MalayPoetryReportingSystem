import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../api/configApi";

export const checkCoauthor = createAsyncThunk(
    "coauthor/check",
    async (publicId, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${BASEURL}/poetry/coauthor/check/${publicId}`, {
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

export const viewCoauthor = createAsyncThunk(
    "coauthor/view",
    async (poetryId, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${BASEURL}/poetry/${poetryId}/coauthors`, {
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

export const addCoauthor = createAsyncThunk(
    "coauthor/add",
    async ({poetryId, coauthors}, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(`${BASEURL}/poetry/${poetryId}/coauthors`, { coauthors }, {
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