import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movie: null,
    isLoading: false,
    error: null
}

const chosenFilmSlice = createSlice({
    name: "chosenFilm",
    initialState,
    reducers: {
        getChosenFilmStart: (state) => {
            state.isLoading = true
        },
        getChosenFilmSuccess: (state, action) => {
            state.isLoading = false
            state.movie = action.payload
        },
        getChosenFilmFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export const {getChosenFilmStart, getChosenFilmSuccess, getChosenFilmFailure} = chosenFilmSlice.actions

export default chosenFilmSlice.reducer