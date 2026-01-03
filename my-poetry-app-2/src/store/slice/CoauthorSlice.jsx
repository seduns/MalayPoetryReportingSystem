import { createSlice } from "@reduxjs/toolkit";
import { addCoauthor, checkCoauthor, viewCoauthor } from "../thunk/CoauthorThunk";

const coauthorSlices = createSlice({
    name: "user",
    initialState: {
        loading: false,
        error: null,
        status: null, 
        coauthorList: []
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(checkCoauthor.pending, (state) => {
                console.log("checkCoauthor pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(checkCoauthor.rejected, (state) => {
                console.log("checkCoauthor rejected");
                state.loading = false;
            })
            .addCase(checkCoauthor.fulfilled, (state, action) => {
                console.log("checkCoauthor fulfilled", action.payload);
                state.loading = false;
                state.status = action.payload;
            })

            .addCase(viewCoauthor.pending, (state) => {
                console.log("viewCoauthor pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(viewCoauthor.rejected, (state) => {
                console.log("viewCoauthor rejected");
                state.loading = false;
            })
            .addCase(viewCoauthor.fulfilled, (state, action) => {
                console.log("viewCoauthor fulfilled", action.payload);
                state.loading = false;
                console.log("the author list", action.payload)
                state.coauthorList = action.payload;
            })

            .addCase(addCoauthor.pending, (state) => {
                console.log("addCoauthor pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(addCoauthor.rejected, (state) => {
                console.log("addCoauthor rejected");
                state.loading = false;
            })
            .addCase(addCoauthor.fulfilled, (state, action) => {
                console.log("addCoauthor fulfilled", action.payload);
                state.loading = false;
            })



    }

})

export const coauthorReducer = coauthorSlices.reducer;