import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../api/configApi";

export const getAllAuthor = createAsyncThunk(
    "author/getlist",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${BASEURL}/author/admin/all`, {
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

export const updateAuthorStatus = createAsyncThunk(
    "author/updateStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            
            const response = await axios.put(
                `${BASEURL}/status/author/${id}?status=${status}`, 
                {}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }
    }
);