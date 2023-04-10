import { createSlice } from "@reduxjs/toolkit";
import { act } from "@testing-library/react";

const initialState = {
    cartoons: [],
    isLoading: false,
    total_pages:0,
    total_results: 0,
    error: null
}

const cartoonsSlice = createSlice({
    name: "cartoons",
    initialState,
    reducers: {
        getCartoonsStart: (state) => {
            state.isLoading = true
        },
        getCartoonsSuccess: (state, action) => {
            state.isLoading = false
            state.cartoons = action.payload.results
            state.total_pages = action.payload.total_pages
            state.total_results = action.payload.total_results
        },
        getCartoonsFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export const {getCartoonsStart, getCartoonsSuccess, getCartoonsFailure} = cartoonsSlice.actions

export default cartoonsSlice.reducer