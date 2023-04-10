import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
// import { setMovieId } from "../../features/chosenMovie/ChosenMovieSlice";
import {getChosenFilmSuccess} from "../../features/chosenFilm/ChosenFilmSlice"
import Movie from "./Movie";

const Row = ({ title, onData, movies }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;
  const film = useParams()

  const favouriteMovies = useSelector((state) => state.favouriteMovies).map(
    (item) => item.id
  );
  const watchLaterMovies = useSelector((state) => state.watchLater).map(
    (item) => item.id
  );

  const handleClickToTop = () => {
    window.scrollTo({
      top: 0,
      behavior:"smooth"
    });
  };

  const handleClick = (movie) => {
    dispatch(getChosenFilmSuccess(movie))
    handleClickToTop()
  }

  return (
    <>
      <Link
        to={`./movies/${title}`}
        className="text-white relative flex items-center hover:text-amber-500 pb-1"
      >
        <h2 className="mr-2 mt-2 pl-5" onClick={() => handleClickToTop()}>
          {title}
        </h2>
        <span className="inline-block w-3 h-3 border-t border-r border-white transform rotate-45 transition duration-300 ease-in-out opacity-0 hover:opacity-100"></span>
      </Link>
      <div className="flex">
        <div
          className="text-white w-full h-full whitespace-nowrap overflow-x-scroll scroll-smooth scrollbar-hide relative"
          id={"slider"}
        >
          {movies.map((movie) => {
            let like = false;
            let saved = false;
            if (favouriteMovies.includes(movie.id)) {
              like = true;
            }
            if (watchLaterMovies.includes(movie.id)) {
              saved = true;
            }

            return (
              <>
                {currentPath === `/${film.type}/${film.id}` ? (
                  <Link to={`/${movie?.hasOwnProperty("name") ? "tv" : "movie"}/${movie.id}`}>
                    <Movie
                      movie={movie}
                      favourite={like}
                      savedMovie={saved}
                      key={`${movie?.id}`}
                      onClick={()=> handleClick(movie)}
                    />
                  </Link>
                ) : (
                  <Movie
                    movie={movie}
                    favourite={like}
                    savedMovie={saved}
                    key={`${movie?.id}`}
                    onClick={()=> handleClick(movie)}
                  />
                )} 
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Row;
