import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { getChosenFilmSuccess } from "../../features/chosenFilm/ChosenFilmSlice";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = ({ title, movies, rowId }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;
  const film = useParams();

  const favouriteMovies = useSelector((state) => state.favouriteMovies).map(
    (item) => item.id
  );
  const watchLaterMovies = useSelector((state) => state.watchLater).map(
    (item) => item.id
  );

  const handleClickToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClick = (movie) => {
    dispatch(getChosenFilmSuccess(movie));
    handleClickToTop();
  };

  const slideToLeft = () => {
    let slider = document.getElementById('slider' + rowId);
    slider.scrollLeft = slider.scrollLeft - 300;
  };

  const slideToRight = () => {
    let slider = document.getElementById('slider' + rowId);
    slider.scrollLeft = slider.scrollLeft + 300;
  };

  return (
    <>
      <Link
        to={`./movies/${title}`}
        className="text-white relative flex items-center hover:text-amber-500 pb-1"
      >
        <h2 className="mr-2 mt-2 pl-5 text-lg tracking-wider" onClick={() => handleClickToTop()}>
          {title}
        </h2>
        <span className="inline-block w-3 h-3 border-t border-r border-white transform rotate-45 transition duration-300 ease-in-out opacity-0 hover:opacity-100"></span>
      </Link>
      <div className="flex relative items-center group ">
        <MdChevronLeft
          className="bg-white rounded-full absolute left-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
          onClick={() => slideToLeft()}

        />
        <div
          className="text-white w-full h-full whitespace-nowrap overflow-x-scroll scroll-smooth scrollbar-hide relative"
          id={'slider' + rowId}
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
                  <Link
                    to={`/${movie?.hasOwnProperty("name") ? "tv" : "movie"}/${
                      movie.id
                    }`}
                  >
                    <Movie
                      movie={movie}
                      favourite={like}
                      savedMovie={saved}
                      key={`${movie?.id}`}
                      onClick={() => handleClick(movie)}
                    />
                  </Link>
                ) : (
                  <Movie
                    movie={movie}
                    favourite={like}
                    savedMovie={saved}
                    key={`${movie?.id}`}
                    onClick={() => handleClick(movie)}
                  />
                )}
              </>
            );
          })}
        </div>
        <MdChevronRight
          className="bg-white rounded-full absolute right-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
          onClick={() => slideToRight()}
        />
      </div>
    </>
  );
};

export default Row;
