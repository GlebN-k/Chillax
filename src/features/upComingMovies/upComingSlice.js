import { createSlice } from "@reduxjs/toolkit";
// import { act } from "react-dom/test-utils";

const initialState = {
    movies: [],
    isLoading: false,
    error: null
}

const upComingSlice = createSlice({
    name: 'upComingMovies',
    initialState,
    reducers: {
        getUpComingMoviesStart: (state) => {
            state.isLoading = true
        },
        getUpComingMoviesSuccess: (state, action) => {
            state.movies = action.payload.results
            state.isLoading = false
        },
        getUpComingMoviesFailure: (state, action) => {
            state.error = action.payload
        }
    }
})

export const {getUpComingMoviesStart, getUpComingMoviesSuccess, getUpComingMoviesFailure} = upComingSlice.actions

export default upComingSlice.reducer