import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    isLoading: false,
    total_pages:100,
    total_results: 20000,
    error: null
}

const trendingMoviesSlice = createSlice({
    name: 'trendingMovies',
    initialState,
    reducers: {
        getTrendingMoviesStart: (state) => {
            state.isLoading = true
        },
        getTrendingMoviesSuccess: (state, action) => {
            state.movies = action.payload.results
            state.isLoading = false
        },
        getTrendingMoviesFailure: (state, action) => {
            state.error = action.payload
        }
    }
})

export const {getTrendingMoviesStart, getTrendingMoviesSuccess, getTrendingMoviesFailure} = trendingMoviesSlice.actions

export default trendingMoviesSlice.reducer