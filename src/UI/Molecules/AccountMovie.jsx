import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import {
  deleteMovie,
} from "../../features/watchLaterMovies/watchLaterSlice";
import BtnDetails from "../Atoms/BtnDetails";
import { deleteFavouriteMovie } from "../../features/favouriteMovies/favouriteMovies";

const AccountMovies = ({ movie, onClick, section }) => {
  const { user } = UserAuth();
  const dispatch = useDispatch();
  const watchLaterArray = useSelector((state) => state.watchLater);
  const favouriteMoviesArray = useSelector((state) => state.favouriteMovies);
  const movieRef = doc(db, "users", `${user?.email}`);

  const deleteSavedMovieFirestore = async (movieId) => {
    dispatch(deleteMovie({ id: movie.id }));
    try {
      console.log("movviiiiee", movieId);
      console.log(watchLaterArray);
      const results = watchLaterArray.filter((item) => item.id !== movieId);
      await updateDoc(movieRef, {
        watchLaterMovies: results,
      });
    } catch (error) {
      alert("error", error);
    }
  };

  const deleteFavouriteMovieFirestore = async (movieId) => {
    dispatch(deleteFavouriteMovie({ id: movie.id }));
    try {
      console.log("movviiiiee", movieId);
      console.log(favouriteMoviesArray);
      const results = favouriteMoviesArray.filter(
        (item) => item.id !== movieId
      );
      await updateDoc(movieRef, {
        savedShows: results,
      });
    } catch (error) {
      alert("error", error);
    }
  };

  const deleteMyMovie = (section, movieId) => {
    if (section === "saved") {
      deleteSavedMovieFirestore(movieId);
    } else {
      deleteFavouriteMovieFirestore(movieId);
    }
  };

  return (
    <>
      <div
        onClick={onClick}
        className="text-white relative p-2 flex flex-col items-center md:flex-row md:items-center gap-3 bg-blue-gray-400 bg-opacity-50 rounded"
      >
        <img
          className="w-[300px] md:w-[240px] lg:w-[280px] rounded"
          src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="w-full  text-white flex flex-col justify-between ml-10px">
          <div>
            <div className="uppercase text-amber-300 text-center ">
              {movie?.title}
            </div>
            <p className="w-full text-white text-justify  indent-3">
              {movie?.overview}
            </p>
          </div>
          <div className="flex justify-between mt-[10px]">
            <div className="flex gap-5">
              <Link to={`/${movie.type}/${movie?.id}`}>
                <BtnDetails movie={movie} />
              </Link>
            </div>
            <AiOutlineCloseCircle
              className="h-[2em] w-[2em] cursor-pointer hover:bg-gray-500 rounded-full"
              onClick={() => deleteMyMovie(section, movie.id)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountMovies;
