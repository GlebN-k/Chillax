import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    isLoading: false,
    total_pages:100,
    total_results: 20000,
    error: null
}

const topMoviesSlice = createSlice ({
    name: "topMovies",
    initialState,
    reducers: {
        getTopMoviesStart: (state) => {
            state.isLoading = true
        },
        getTopMoviesSuccess: (state, action) => {
            state.movies = action.payload.results
            state.isLoading = false
        },
        getTopMoviesFailure: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

export const {getTopMoviesStart, getTopMoviesSuccess, getTopMoviesFailure} = topMoviesSlice.actions

export default topMoviesSlice.reducer