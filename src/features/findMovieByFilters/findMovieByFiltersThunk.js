import {getMoviesByFiltersStart, getMoviesByFiltersSuccess, getMoviesByFiltersFailure} from "./findMovieByFiltersSlice"
import { key } from "../../requests";

export const fetchAllMoviesByFilters = (mediaType = "movie", page = 1, genre, country, safeMode) => async (dispatch) => {
  dispatch(getMoviesByFiltersStart());

  try {
    const response = await fetch(

`https://api.themoviedb.org/3/discover/${mediaType}?api_key=${key}${genre && `&with_genres=${genre}`}&sort_by=popularity.desc&${country && `with_origin_country=${country}`}&include_adult=${safeMode}&page=${page}`
        //   `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${key}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${genre}&with_production_countries=FR&page=${page}`

    //   `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=35`
    );
    const data = await response.json();
    dispatch(getMoviesByFiltersSuccess(data));
  } catch (error) {
    dispatch(getMoviesByFiltersFailure(error.message));
  }
};
