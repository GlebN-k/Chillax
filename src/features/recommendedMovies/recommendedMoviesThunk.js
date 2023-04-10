import {
  getRecommendedMoviesStart,
  getRecommendedMoviesSuccess,
  getRecommendedMoviesFailure,
} from "./recommendedMoviesSlice";

export const fetchRecommendedMovies = (film) => async (dispatch) => {
  dispatch(getRecommendedMoviesStart());

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${film.hasOwnProperty("name") ? "tv" : "movie"}/${film.id}/recommendations?api_key=acf837ccca44b10855aa8ef467ec0211&language=en-US&page=1`
    );
    const data = await response.json();
    dispatch(getRecommendedMoviesSuccess(data));
  } catch (error) {
    dispatch(getRecommendedMoviesFailure(error.message));
  }
};
