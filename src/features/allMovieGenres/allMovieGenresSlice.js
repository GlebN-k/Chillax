import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    allGenres: [],
    isError: null
}

const allMovieGenresSlice = createSlice({
    name: "allGenres",
    initialState,
    reducers: {
        getAllMovieGenresStart: (state) => {
            state.isLoading = true
        },
        getAllMovieGenresSuccess: (state, action) => {
            state.isLoading = false
            state.allGenres = action.payload
        },
        getAllMovieGenresFailure: (state, action) => {
            state.isLoading = false
            state.isError = action.payload
        }
    }
})

export const {getAllMovieGenresStart, getAllMovieGenresSuccess, getAllMovieGenresFailure} = allMovieGenresSlice.actions

export default allMovieGenresSlice.reducer