import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../api/configApi";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASEURL}/auth/signup`, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${BASEURL}/auth/signin`, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
)