import {
  getTopMoviesStart,
  getTopMoviesSuccess,
  getTopMoviesFailure,
} from "./topMovies";

export const fetchTopMovies = (page = 1) => async (dispatch) => {
  dispatch(getTopMoviesStart());

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=acf837ccca44b10855aa8ef467ec0211&language=en-US&page=${page}`
    );
    const data = await response.json();
    dispatch(getTopMoviesSuccess(data));
  } catch (error) {
    dispatch(getTopMoviesFailure(error.message));
  }
};
