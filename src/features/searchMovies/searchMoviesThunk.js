import { async } from "@firebase/util";
import {
  getSearchMoviesStart,
  getSearchMoviesSuccess,
  getSearchMoviesFailure,
} from "./searchMoviesSlice";
import { key } from "../../requests";

export const fetchSearchMovies = (value, page = 1) => async (dispatch) => {
  dispatch(getSearchMoviesStart());

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${key}&query=${value}&page=${page}`
    );
    const data = await response.json();
    dispatch(getSearchMoviesSuccess(data));
  } catch (error) {
    dispatch(getSearchMoviesFailure(error));
  }
};
