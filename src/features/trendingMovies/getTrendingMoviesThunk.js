import { async } from "@firebase/util";
import {
  getTrendingMoviesStart,
  getTrendingMoviesSuccess,
  getTrendingMoviesFailure,
} from "./trendingMoviesSlice";

export const fetchTrendingMovies = () => async (dispatch) => {
  dispatch(getTrendingMoviesStart());

  try {
    const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=acf837ccca44b10855aa8ef467ec0211&language=en-US&page=1`)
    const data = await response.json()
    dispatch(getTrendingMoviesSuccess(data))
  } catch (error) {
    dispatch(getTrendingMoviesFailure(error.message))
  }
};
