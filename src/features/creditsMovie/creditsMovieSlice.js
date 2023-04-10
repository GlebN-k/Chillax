import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    value: [],
    error: null
}

const creditsMovieSlice = createSlice({
    name: "creditsMovie",
    initialState,
    reducers: {
        getCreditsStart: (state) => {
            state.isLoading = true
        },
        getCreditsSuccess: (state, action) => {
            state.isLoading = false
            state.value = action.payload.cast
        },
        getCreditsFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export const {getCreditsStart, getCreditsSuccess, getCreditsFailure} = creditsMovieSlice.actions

export default creditsMovieSlice.reducer