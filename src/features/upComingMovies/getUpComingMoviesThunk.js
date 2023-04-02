import {
  getUpComingMoviesStart,
  getUpComingMoviesSuccess,
  getUpComingMoviesFailure,
} from "./upComingSlice";

export const fetchUpComingMovies = (page = 1) => async (dispatch) => {
  dispatch(getUpComingMoviesStart());

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=acf837ccca44b10855aa8ef467ec0211&language=en-US&page=${page}`
    );
    const data = await response.json();
    dispatch(getUpComingMoviesSuccess(data));
  } catch (error) {
    dispatch(getUpComingMoviesFailure(error.message));
  }
};
