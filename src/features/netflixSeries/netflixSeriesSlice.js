import { createSlice } from "@reduxjs/toolkit";
// import { act } from "@testing-library/react";

const initialState = {
    movies: [],
    isLoading: false,
    total_pages:0,
    total_results: 0,
    error: null
}

const netflixSeriesSlice = createSlice({
    name: "netflixSeries",
    initialState,
    reducers: {
        getNetflixSeriesStart: (state) => {
            state.isLoading = true
        },
        getNetflixSeriesSuccess: (state, action) => {
            state.isLoading = false
            state.movies = action.payload.results
            state.total_pages = action.payload.total_pages
            state.total_results = action.payload.total_results
        },
        getNetflixSeriesFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export const {getNetflixSeriesStart, getNetflixSeriesSuccess, getNetflixSeriesFailure} = netflixSeriesSlice.actions

export default netflixSeriesSlice.reducer