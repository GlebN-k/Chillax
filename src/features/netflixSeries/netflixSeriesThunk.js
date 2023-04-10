import { async } from "@firebase/util";
import {
  getNetflixSeriesStart,
  getNetflixSeriesSuccess,
  getNetflixSeriesFailure,
} from "./netflixSeriesSlice";
import { key } from "../../requests";

export const fetchNetflixSeries =
  (page = 1) =>
  async (dispatch) => {
    dispatch(getNetflixSeriesStart());

    try {
      const response = await fetch(
        // `https://api.themoviedb.org/3/discover/tv?api_key=${key}&page=${page}`
        `https://api.themoviedb.org/3/discover/tv?api_key=${key}&with_networks=213&page=${page}`
      );
      const data = await response.json();
      dispatch(getNetflixSeriesSuccess(data));
    } catch (error) {
      dispatch(getNetflixSeriesFailure());
    }
  };
