import { async } from "@firebase/util";
import {
  getCartoonsStart,
  getCartoonsSuccess,
  getCartoonsFailure,
} from "./cartoonsSlice";
import { key } from "../../requests";

export const fetchCartoons = (page) => async (dispatch) => {
  dispatch(getCartoonsStart());

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=16&page=${page}`
    );
    const data = await response.json();
    dispatch(getCartoonsSuccess(data));
  } catch (error) {
    dispatch(getCartoonsFailure());
  }
};
