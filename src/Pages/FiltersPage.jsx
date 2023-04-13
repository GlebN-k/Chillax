// import { select } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCountries } from "../features/allCountries/AllCountriesThunk";
import { fetchAllMovieGenres } from "../features/allMovieGenres/allMovieGenresThunk";
import { fetchAllMoviesByFilters } from "../features/findMovieByFilters/findMovieByFiltersThunk";
import MoviesRow from "../UI/Molecules/MoviesRow";
import Pagination from "../UI/Molecules/Pagination";

const FiltersPage = () => {
  const [mediaType, setMediaType] = useState("movie");
  const [genre, setGenre] = useState("");
  const [country, setCountry] = useState("");
  const [safeMode, setSafeMode] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  const allMovieGenres = useSelector(
    (state) => state.allMovieGenres.allGenres.genres
  );
  const allCountries = useSelector((state) => state.allCountries.countries);
  const movieResultsByFilters = useSelector(
    (state) => state.findMovieByFilters.movies
  );

  const handleMediaType = (e) => {
    if (e.target.value === "cartoons") {
      setMediaType("movie");
      setGenre("16");
      setDisabled(true);
      return;
    }
    if (e.target.value === "tvShows") {
      setMediaType("tv");
      setGenre("10764");
      setDisabled(true);
      return;
    }
    setDisabled(false);
    setMediaType(e.target.value);
  };

  console.log("movie genres", allMovieGenres);
  console.log("media type", mediaType);
  console.log("object", movieResultsByFilters);
  console.log("genre", genre);
  console.log("allCountries", allCountries);
  console.log("safeMode", safeMode);

  useEffect(() => {
    dispatch(fetchAllMoviesByFilters(mediaType, 1, genre, country, safeMode));
  }, [dispatch, mediaType, genre, country, safeMode]);

  useEffect(() => {
    dispatch(fetchAllMovieGenres(mediaType));
    dispatch(fetchAllCountries());
  }, [dispatch, mediaType]);

  return (
    <div className="text-white">
      <div className="relative h-[100px] w-full z-10"></div>
      <div className="w-[70%] mx-auto text-center">
        <div className="text-white text-2xl tracking-wider mb-5">SEARCH MOVIE</div>
        <div className="flex flex-wrap  gap-3 mb-5">
          {/* search by media type */}
          <select
            className="bg-black rounded-full text-center tracking-wider"
            onChange={(e) => handleMediaType(e)}
          >
            <option value="movie">Movies</option>
            <option value="tv">Series</option>
            <option value="cartoons">Cartoons</option>
            <option value="tvShows">TV Shows</option>
          </select>

          {/* search by genres */}
          <select
            className="bg-black rounded-full text-center tracking-wider"
            id="genres"
            disabled={disabled}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">all genres</option>
            {allMovieGenres?.map((genre) => (
              <option value={genre?.id} key={genre?.id}>
                {genre?.name}
              </option>
            ))}
          </select>

          {/* search by countries */}
          <select
            className="bg-black rounded-full text-center tracking-wider lg-max:w-full"
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">all countries</option>
            {allCountries.map((country) => (
              <option value={country.iso_3166_1} key={country.iso_3166_1}>
                {country.english_name}
              </option>
            ))}
          </select>

          <button
            className="text-white border-gray-500 px-4 py-2 hover:bg-white hover:text-black  border-[1px]  rounded-full"
            onClick={() => setSafeMode(!safeMode)}
            style={
              safeMode
                ? { backgroundColor: "black", color: "white" }
                : { backgroundColor: "white", color: "black" }
            }
          >
            Safe for children
          </button>
        </div>
      </div>

      {/* movies */}
      <div>
        <MoviesRow movies={movieResultsByFilters.results} />
        <Pagination
          total_pages={movieResultsByFilters?.total_pages}
          genre={genre}
          mediaType={mediaType}
          country={country}
          safeMode={safeMode}
        />
      </div>
    </div>
  );
};

export default FiltersPage;
