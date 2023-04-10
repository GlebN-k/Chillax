import React from "react";
import { useDispatch } from "react-redux";
import { getChosenFilmSuccess } from "../../features/chosenFilm/ChosenFilmSlice";

const SearchInputMovie = ({ movie, hideLoupe }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(getChosenFilmSuccess(movie));
    hideLoupe();
  };

  return (
    <div
      className=" px-2 bg-black bg-opacity-90  cursor-pointer text-white hover:bg-blue-300 w-[400px]"
      onClick={() => handleClick()}
    >
      <div className="flex gap-2 py-2">
        <img
          className="w-[50px] h-[75px] rounded"
          src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
          alt={`${movie?.title || movie?.name}`}
        />
        <div className="flex flex-col justify-around">
          <p>{movie?.title || movie?.name}</p>
          <div className="flex gap-8">
            <div className="bg-gray-600 px-2 py-1 rounded">
              {(movie?.release_date || movie?.first_air_date)?.slice(0, 4)}
            </div>
            <div className="bg-amber-300 text-black rounded px-2 py-1 flex">
              IMDb: {movie?.vote_average}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInputMovie;
