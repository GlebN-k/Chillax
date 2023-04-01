import { configureStore } from "@reduxjs/toolkit";
import  watchLaterSlice  from "../features/watchLaterMovies/watchLaterSlice";
import setMovieId from "../features/chosenMovie/ChosenMovieSlice"
import favouriteMovies from "../features/favouriteMovies/favouriteMovies";
import getPopularMovieAPISlice from "../features/getPopularMoviesAPI/getPopuparMoviesSlice";
import topMoviesSlice from "../features/topMoviesSlice/topMovies"
import upComingSlice from "../features/upComingMovies/upComingSlice";
import trendingMoviesSlice from "../features/trendingMovies/trendingMoviesSlice";

export const store = configureStore({
    reducer:{
        watchLater: watchLaterSlice,
        movieId: setMovieId,
        favouriteMovies: favouriteMovies,
        popularMovies: getPopularMovieAPISlice,
        topRatedMovies: topMoviesSlice,
        upComingMovies: upComingSlice,
        trendingMovies: trendingMoviesSlice,
    }
})