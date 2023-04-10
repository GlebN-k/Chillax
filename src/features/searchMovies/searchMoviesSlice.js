import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    isLoading: false,
    total_pages:0,
    total_results: 0,
    error: null
}

const searchMoviesSlice = createSlice({
    name: "searchMovies",
    initialState,
    reducers: {
        getSearchMoviesStart: (state) => {
            state.isLoading = true
        },
        getSearchMoviesSuccess: (state, action) => {
            state.isLoading = false
            state.movies = action.payload.results
            state.total_pages = action.payload.total_pages
            state.total_results = action.payload.total_results
        },
        getSearchMoviesFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export const {getSearchMoviesStart, getSearchMoviesSuccess, getSearchMoviesFailure} = searchMoviesSlice.actions

export default searchMoviesSlice.reducer