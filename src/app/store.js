import { configureStore } from "@reduxjs/toolkit";
import  watchLaterSlice  from "../features/watchLaterMovies/watchLaterSlice";
import favouriteMovies from "../features/favouriteMovies/favouriteMovies";
import getPopularMovieAPISlice from "../features/getPopularMoviesAPI/getPopuparMoviesSlice";
import topMoviesSlice from "../features/topMoviesSlice/topMovies"
import upComingSlice from "../features/upComingMovies/upComingSlice";
import trendingMoviesSlice from "../features/trendingMovies/trendingMoviesSlice";
import recommendedMoviesSlice from "../features/recommendedMovies/recommendedMoviesSlice";
import creditsMovieSlice from "../features/creditsMovie/creditsMovieSlice";
import searchMoviesSlice from "../features/searchMovies/searchMoviesSlice";
import cartoonsSlice from "../features/cartoons/cartoonsSlice";
import seriesSlice from "../features/series/seriesSlice";
import netflixSeriesSlice from "../features/netflixSeries/netflixSeriesSlice";
import ChosenFilmSlice from "../features/chosenFilm/ChosenFilmSlice";
// import productionCompanySlice from "../features/productionCompanies/productionCompanySlice";
import allMovieGenresSlice from "../features/allMovieGenres/allMovieGenresSlice";
import findMovieByFiltersSlice from "../features/findMovieByFilters/findMovieByFiltersSlice";
import allCountriesSlice from "../features/allCountries/allCountriesSlice";

export const store = configureStore({
    reducer:{
        watchLater: watchLaterSlice,
        favouriteMovies: favouriteMovies,
        popularMovies: getPopularMovieAPISlice,
        topRatedMovies: topMoviesSlice,
        upComingMovies: upComingSlice,
        trendingMovies: trendingMoviesSlice,
        recommendedMovies: recommendedMoviesSlice,
        creditsMovie: creditsMovieSlice,
        searchMovies: searchMoviesSlice,
        cartoonsMovies: cartoonsSlice,
        seriesMovies: seriesSlice,
        netflixSeriesMovies: netflixSeriesSlice,
        chosenFilm: ChosenFilmSlice,
        allMovieGenres: allMovieGenresSlice,
        findMovieByFilters: findMovieByFiltersSlice,
        allCountries: allCountriesSlice,
    }
})