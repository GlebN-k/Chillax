import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    movies: [],
    isError: null
}

const findMovieByFiltersSlice = createSlice({
    name: "findMovieByFilters",
    initialState,
    reducers: {
        getMoviesByFiltersStart: (state) => {
            state.isLoading = true
        },
        getMoviesByFiltersSuccess: (state, action) => {
            state.isLoading = false
            state.movies = action.payload
        },
        getMoviesByFiltersFailure: (state, action) => {
            state.isLoading = false
            state.isError = action.payload
        }
    }
})

export const {getMoviesByFiltersStart, getMoviesByFiltersSuccess, getMoviesByFiltersFailure} = findMovieByFiltersSlice.actions

export default findMovieByFiltersSlice.reducer