import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  isLoading: false,
  error: null,
};

const recommendedMovies = createSlice({
  name: "recommendedMovies",
  initialState,
  reducers: {
    getRecommendedMoviesStart: (state) => {
        state.isLoading = true
    },
    getRecommendedMoviesSuccess: (state, action) => {
      state.movies = action.payload.results
        state.isLoading = false
    },
    getRecommendedMoviesFailure: (state, action) => {
        state.isLoading = false
        state.error = action.payload
    }
  },
});

export const { getRecommendedMoviesStart, getRecommendedMoviesSuccess, getRecommendedMoviesFailure } = recommendedMovies.actions;

export default recommendedMovies.reducer;
