import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import {
  addMovie,
  deleteMovie,
} from "../../features/watchLaterMovies/watchLaterSlice";
import { addFavouriteMovie } from "../../features/favouriteMovies/favouriteMovies";

const Movie = ({ movie, onClick, favourite, savedMovie }) => {
  const [like, setLike] = useState(favourite);
  const [watchLater, setWatchLater] = useState(savedMovie);
  // const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const dispatch = useDispatch();
  const movieId = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      // setSaved(true);
      await updateDoc(movieId, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title || movie.name,
          backdrop_path: movie.backdrop_path,
          overview: movie.overview,
          type: `${movie.hasOwnProperty("name") ? "tv" : "movie"}`,
        }),
      });
    } else {
      alert("you need to log in first");
    }
  };

  const saveWatchLaterFirebase = async () => {
    if (user?.email) {
      await updateDoc(movieId, {
        watchLaterMovies: arrayUnion({
          id: movie.id,
          title: movie.title || movie.name,
          backdrop_path: movie.backdrop_path,
          overview: movie.overview,
          type: `${movie.hasOwnProperty("name") ? "tv" : "movie"}`,
        }),
      });
    } else {
      alert("you need to log in first");
    }
  };

  const watchMovieLater = (e) => {
    // e.preventDefault()
    // e.stopImmediatePropagation()
    if (user?.email) {
      saveWatchLaterFirebase();
      console.log("watch movie later");
      dispatch(
        addMovie({
          id: movie.id,
          title: movie.title || movie.name,
          backdrop_path: movie.backdrop_path,
          overview: movie.overview,
          type: `${movie.hasOwnProperty("name") ? "tv" : "movie"}`,
        })
      );
      setWatchLater(!watchLater);
    } else {
      alert("you need to log in first");
    }
  };

  const deleteMovieFromWatchLater = () => {
    dispatch(deleteMovie({ id: movie.id }));
    setWatchLater(!watchLater);

    console.log("delete button pressed");
  };

  const addFavMovie = () => {
    dispatch(
      addFavouriteMovie({
        id: movie.id,
        title: movie.title || movie.name,
        backdrop_path: movie.backdrop_path,
        overview: movie.overview,
        type: `${movie.hasOwnProperty("name") ? "tv" : "movie"}`,
      })
    );
  };

  const addFavouriteMovieStore = () => {
    saveShow();
    addFavMovie();
  };

  return (
    <>
      <div
        onClick={onClick}
        className="text-white w-[220px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
      >
        {movie?.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
            alt={movie?.title || movie?.name}
          />
        ) : (
          <img className="h-[148px] justify-center m-auto"
            src={`https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png`}
            alt={movie?.title || movie?.name}
          />
        )}
        <div className="w-full h-full absolute top-0 left-0 hover:bg-black/80 opacity-0 hover:opacity-100 text-white flex justify-center items-center text-center whitespace-pre-wrap   ">
          {movie?.title || movie?.name}
          <div className="absolute top-[10px] left-[10px] flex gap-2">
            {like ? (
              <AiFillStar />
            ) : (
              <AiOutlineStar onClick={() => addFavouriteMovieStore()} />
              // <AiOutlineStar onClick={() => saveShow()} />
            )}
            {watchLater ? (
              <TiTick onClick={() => deleteMovieFromWatchLater()} />
            ) : (
              <MdOutlineWatchLater onClick={(e) => watchMovieLater(e)} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Movie;
