import {
  getCreditsStart,
  getCreditsSuccess,
  getCreditsFailure,
} from "./creditsMovieSlice";
import { key } from "../../requests"

export const fetchCreditsMovie = (film) => async (dispatch) => {
  dispatch(getCreditsStart());

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${film.hasOwnProperty("name") ? "tv" : "movie"}/${film.id}/credits?api_key=${key}&language=en-US`
      // `https://api.themoviedb.org/3/${film.media_type === "tv" ? "tv" : "movie"}/${film.id}/credits?api_key=${key}&language=en-US`
    );
    const data = await response.json(response);
    dispatch(getCreditsSuccess(data));
  } catch (error) {
    dispatch(getCreditsFailure(error));
  }
};
