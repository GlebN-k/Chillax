import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    isLoading: false,
    total_pages:100,
    total_results: 20000,
    error: null
}

const getPopularMovieAPISlice = createSlice({
    name: "Popular",
    // name: "getPopularMovies",
    initialState,
    reducers: {
        getPopularMoviesStart: (state) => {
            state.isLoading = true;
        },
        getPopularMoviesSuccess: (state, action) => {
            state.isLoading = false;
            state.movies = action.payload.results;
        },
        getPopularMoviesFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export const fetchPopularMovies = (page = 1) => async (dispatch) => {
    dispatch(getPopularMoviesStart())
  
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=acf837ccca44b10855aa8ef467ec0211&language=en-US&page=${page}`)
      const data = await response.json()
      dispatch(getPopularMoviesSuccess(data))
    } catch (error) {
      dispatch(getPopularMoviesFailure(error.message))
    }
  }

export const {getPopularMoviesStart, getPopularMoviesSuccess, getPopularMoviesFailure} = getPopularMovieAPISlice.actions

export default getPopularMovieAPISlice.reducer