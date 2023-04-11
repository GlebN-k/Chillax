import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    countries: [],
    isError: null
}

const allCountriesSlice = createSlice({
    name: "allCountries",
    initialState,
    reducers: {
        getAllCountriesStart: (state) => {
            state.isLoading = true
        },
        getAllCountriesSuccess: (state, action) => {
            state.isLoading = false
            state.countries = action.payload
        },
        getAllCountriesFailure: (state, action) => {
            state.isLoading = false
            state.isError = action.payload
        }
    }
})

export const {getAllCountriesStart, getAllCountriesSuccess, getAllCountriesFailure} = allCountriesSlice.actions

export default allCountriesSlice.reducer