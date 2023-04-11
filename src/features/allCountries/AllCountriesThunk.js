import {
  getAllCountriesStart,
  getAllCountriesSuccess,
  getAllCountriesFailure,
} from "./allCountriesSlice";
import { key } from "../../requests";

export const fetchAllCountries =
  (mediaType = "movie") =>
  async (dispatch) => {
    dispatch(getAllCountriesStart());

    try {
      const response = await fetch(
        // `${url}`// `https://api.themoviedb.org/3/genre/tv/list?api_key=${key}`
        // `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`
        `https://api.themoviedb.org/3/configuration/countries?api_key=${key}`

      );
      const data = await response.json();
      dispatch(getAllCountriesSuccess(data));
    } catch (error) {
      dispatch(getAllCountriesFailure(error.message));
    }
  };
