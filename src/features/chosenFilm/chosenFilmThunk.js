import {
  getChosenFilmStart,
  getChosenFilmSuccess,
  getChosenFilmFailure,
} from "./ChosenFilmSlice";
import { key } from "../../requests";

export const fetchChosenFilm = (movie) => async (dispatch) => {
  dispatch(getChosenFilmStart());
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${movie.type}/${movie.id}?api_key=${key}&language=en-US`
    );
    const data = await response.json();
    dispatch(getChosenFilmSuccess(data));
  } catch (error) {
    dispatch(getChosenFilmFailure(error));
  }
};
