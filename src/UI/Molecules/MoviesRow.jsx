import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getChosenFilmSuccess } from "../../features/chosenFilm/ChosenFilmSlice";
import Movie from "./Movie";

const MoviesRow = ({ movies }) => {
  const dispatch = useDispatch();
  const favouriteMovies = useSelector((state) => state.favouriteMovies).map(
    (item) => item.id
  );
  const watchLaterMovies = useSelector((state) => state.watchLater).map(
    (item) => item.id
  );

  return (
    <>
      <div className="flex flex-col">
        {/* <div className="text-white w-full h-full relative" id={"slider"}> */}
        <div className="text-white w-full h-full relative flex flex-wrap justify-center " id={"slider"}>
          {movies?.map((movie) => {
            let like = false;
            let saved = false;
            if (favouriteMovies.includes(movie.id)) {
              like = true;
            }
            if (watchLaterMovies.includes(movie.id)) {
              saved = true;
            }

            return (
            <Link to={`/${movie.hasOwnProperty("name") ? "tv" : "movie"}/${movie?.id}`}>
                <Movie
                  movie={movie}
                  favourite={like}
                  savedMovie={saved}
                  key={`${movie?.id}`}
                  onClick={() => dispatch(getChosenFilmSuccess(movie))}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MoviesRow;