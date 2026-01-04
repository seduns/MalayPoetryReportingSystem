import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../api/configApi";

export const getAllAnalytics = createAsyncThunk(
    "analytics/all",
    async (publicId, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${BASEURL}/poetry/analytics/all`, {
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

export const addView = createAsyncThunk(
    "analytics/addView",
    async (analyticsId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");

            const response = await axios.patch(
                `${BASEURL}/poetry/analytics/${analyticsId}/view`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return {

                analyticsId,
                data: response.data,
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Failed to add view" }
            );
        }
    }
);

export const addLike = createAsyncThunk(
    "analytics/addLike",
    async (analyticsId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");

            const response = await axios.patch(
                `${BASEURL}/poetry/analytics/${analyticsId}/like`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return {
                analyticsId,
                data: response.data,
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Failed to add like" }
            );
        }
    }
);