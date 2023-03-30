import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { useDispatch } from "react-redux";

import { UserAuth } from "../../Context/AuthContext";
import { db } from "../../firebase";
import {
  addMovie,
  deleteMovie,
} from "../../features/watchLaterMovies/watchLaterSlice";
import { addFavouriteMovie } from "../../features/favouriteMovies/favouriteMovies";

const Movie = ({ movie, onClick }) => {
  const [like, setLike] = useState(false);
  const [watchLater, setWatchLater] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const dispatch = useDispatch();

  const movieId = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieId, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title || movie.name,
          backdrop_path: movie.backdrop_path,
          overview: movie.overview,
        }),
      });
    } else {
      alert("you need to log in first");
    }
  };

  // const saveWatchMovieLater

  const watchMovieLater = (e) => {
    // e.preventDefault()
    // e.stopImmediatePropagation()
    if (user?.email) {
      console.log("watch movie later");
      dispatch(
        addMovie({
          id: movie.id,
          title: movie.title || movie.name,
          backdrop_path: movie.backdrop_path,
          overview: movie.overview,
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
        className="text-white w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
          alt={movie?.title || movie?.name}
        />
        <div className="w-full h-full absolute top-0 left-0 hover:bg-black/80 opacity-0 hover:opacity-100 text-white flex justify-center items-center text-center">
          {movie?.title || movie?.name}
          <div className="absolute top-[10px] left-[10px] flex gap-2" >
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
