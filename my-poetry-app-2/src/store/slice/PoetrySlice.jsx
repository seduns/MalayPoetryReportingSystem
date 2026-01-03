import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../thunk/AuthThunk";
import { createPoetry, deletePoetry, getPoetry, getPoetryByAuthorId, getPoetryList, updatePoetry } from "../thunk/PoetryThunk";

const poetrySlices = createSlice({
    name: "poetry",
    initialState: {
        poetryData: null,
        loading: false,
        error: null,
        selectedPoetryId: null,
        poetryList: []
    },
    reducers: {
        setSelectedPoetry: (state, action) => {
            state.selectedPoetryId = action.payload.id;
            state.poetryData = null;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(createPoetry.pending, (state) => {
                console.log("createPoetry pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(createPoetry.rejected, (state, action) => {
                console.log("createPoetry rejected", action);
                state.loading = false;
                state.error = action;
            })
            .addCase(createPoetry.fulfilled, (state, action) => {
                console.log("createPoetry fulfilled", action.payload);
                state.loading = false;
                state.poetry = action.payload;
            })

            .addCase(getPoetryList.pending, (state) => {
                console.log("getPoetryList pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(getPoetryList.rejected, (state, action) => {
                console.log("getPoetryList rejected", action);
                state.loading = false;
                state.error = action;
            })
            .addCase(getPoetryList.fulfilled, (state, action) => {
                console.log("getPoetryList fulfilled", action.payload);
                state.loading = false;
                state.poetryList = action.payload;
            })

            .addCase(getPoetry.pending, (state) => {
                console.log("getPoetry pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(getPoetry.rejected, (state, action) => {
                console.log("getPoetry rejected", action);
                state.loading = false;
                state.error = action;
            })
            .addCase(getPoetry.fulfilled, (state, action) => {
                console.log("getPoetry fulfilled", action.payload);
                state.loading = false;
                state.poetryData = action.payload;
            })

            .addCase(updatePoetry.pending, (state) => {
                console.log("updatePoetry pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePoetry.rejected, (state, action) => {
                console.log("updatePoetry rejected", action);
                state.loading = false;
                state.error = action;
            })
            .addCase(updatePoetry.fulfilled, (state, action) => {
                console.log("updatePoetry fulfilled", action.payload);
                state.loading = false;
            })

            .addCase(deletePoetry.pending, (state) => {
                console.log("deletePoetry pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePoetry.rejected, (state, action) => {
                console.log("deletePoetry rejected", action);
                state.loading = false;
                state.error = action;
            })
            .addCase(deletePoetry.fulfilled, (state, action) => {
                console.log("deletePoetry fulfilled", action.payload);
                state.loading = false;
            })

            .addCase(getPoetryByAuthorId.pending, (state) => {
                console.log("getPoetryByAuthorId pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(getPoetryByAuthorId.rejected, (state, action) => {
                console.log("getPoetryByAuthorId rejected", action);
                state.loading = false;
                state.error = action;
            })
            .addCase(getPoetryByAuthorId.fulfilled, (state, action) => {
                console.log("getPoetryByAuthorId fulfilled", action.payload);
                state.loading = false;
                state.poetryList = action.payload
            })

    }

})

export const { setSelectedPoetry } = poetrySlices.actions;

export const poetryReducer = poetrySlices.reducer;