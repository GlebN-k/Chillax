import { async } from "@firebase/util";
import {
  getSeriesStart,
  getSeriesSuccess,
  getSeriesFailure,
} from "./seriesSlice";
import { key } from "../../requests";

export const fetchSeries = (page = 1) => async (dispatch) => {
  dispatch(getSeriesStart());

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${key}&page=${page}`
      // `https://api.themoviedb.org/3/discover/tv?api_key=${key}&with_networks=213&page=${page}`
    );
    const data = await response.json();
    dispatch(getSeriesSuccess(data));
  } catch (error) {
    dispatch(getSeriesFailure());
  }
};
