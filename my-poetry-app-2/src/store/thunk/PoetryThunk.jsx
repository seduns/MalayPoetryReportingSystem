import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../api/configApi";

export const createPoetry = createAsyncThunk(
    "poetry/create",
    async ({ poetryData, accountId }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(`${BASEURL}/poetry/create/${accountId}`, poetryData, {
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

export const getPoetryList = createAsyncThunk(
    "poetry/list",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${BASEURL}/poetry/list`, {
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

export const getPoetry = createAsyncThunk(
    "poetry/get",
    async (poetryId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${BASEURL}/poetry/${poetryId}`, {
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

export const updatePoetry = createAsyncThunk(
    "poetry/updatePoetry",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.put(`${BASEURL}/poetry/edit/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deletePoetry = createAsyncThunk(
    "poetry/deletePoetry",
    async ( poetryId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.delete(`${BASEURL}/poetry/delete/${poetryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);