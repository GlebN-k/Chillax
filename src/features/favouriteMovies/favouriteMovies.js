import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = [];

const favouriteMovies = createSlice({
  name: "favouriteMovies",
  initialState,
  reducers: {
    addFavouriteMovie: (state, action) => {
      state.push(action.payload);
    },
    deleteFavouriteMovie: (state, action) => {
      return state.filter((movie) => movie.id !== action.payload.id);
    },
    addMoviesFromFirestore: (state, action) => {
      state.push(...action.payload)
    },
    clearAllFavourites: (state) => {
      return []
    }
  },
  // extraReducers: {
  //     [fetchMovies.fulfilled]: (state, action) => {
  //         state = action.payload
  //     }
  // }
});

export const {
  addFavouriteMovie,
  deleteFavouriteMovie,
  addMoviesFromFirestore,
  clearAllFavourites
} = favouriteMovies.actions;

export default favouriteMovies.reducer;
