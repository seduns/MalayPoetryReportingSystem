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

export const getDonationByPoetryId = createAsyncThunk(
    "donation/poetry",
    async (poetryId, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${BASEURL}/donation/poetry/${poetryId}`, {
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


export const requestWithdraw = createAsyncThunk(
    "donation/withdraw",
    async (withdrawData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.patch(`${BASEURL}/donation/withdraw`, withdrawData, {
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


export const makeDonation = createAsyncThunk(
    "donation/makedonation",
    async (donationData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.patch(`${BASEURL}/donation/new`, donationData, {
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

