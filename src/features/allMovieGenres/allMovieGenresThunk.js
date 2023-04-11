import {
  getAllMovieGenresStart,
  getAllMovieGenresSuccess,
  getAllMovieGenresFailure,
} from "./allMovieGenresSlice";
import { key } from "../../requests";

export const fetchAllMovieGenres = (mediaType = "movie") => async (dispatch) => {
  dispatch(getAllMovieGenresStart());

  try {
    const response = await fetch(
      // `${url}`// `https://api.themoviedb.org/3/genre/tv/list?api_key=${key}`
      // `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`
      `https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${key}`
    );
    const data = await response.json();
    dispatch(getAllMovieGenresSuccess(data));
  } catch (error) {
    dispatch(getAllMovieGenresFailure(error.message));
  }
};
