import { createSlice } from "@reduxjs/toolkit";
// import { act } from "@testing-library/react";

const initialState = {
    movies: [],
    isLoading: false,
    total_pages:0,
    total_results: 0,
    error: null
}

const seriesSlice = createSlice({
    name: "series",
    initialState,
    reducers: {
        getSeriesStart: (state) => {
            state.isLoading = true
        },
        getSeriesSuccess: (state, action) => {
            state.isLoading = false
            state.movies = action.payload.results
            state.total_pages = action.payload.total_pages
            state.total_results = action.payload.total_results
        },
        getSeriesFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export const {getSeriesStart, getSeriesSuccess, getSeriesFailure} = seriesSlice.actions

export default seriesSlice.reducer