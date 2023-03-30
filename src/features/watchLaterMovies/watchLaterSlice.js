import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const watchLaterSlice = createSlice ({
    name: 'watchLater',
    initialState,
    reducers:{
        addMovie: (state, action) => {
            state.push(action.payload)
        },
        deleteMovie: (state, action) => {
            let newArr = state.filter(movie => movie.id !== action.payload.id)
            return newArr
        }
    }
})

export const {addMovie, deleteMovie} = watchLaterSlice.actions

export default watchLaterSlice.reducer