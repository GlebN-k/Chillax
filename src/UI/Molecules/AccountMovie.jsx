import React, { useState } from "react";
// import { AiOutlineStar, AiFillStar } from "react-icons/ai";
// import { MdOutlineWatchLater } from "react-icons/md";
// import { TiTick } from "react-icons/ti";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { arrayUnion, doc, updateDoc, deleteDoc } from "firebase/firestore";
// import { async } from "@firebase/util";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { UserAuth } from "../../Context/AuthContext";
import { db } from "../../firebase";
import {
  addMovie,
  deleteMovie,
} from "../../features/watchLaterMovies/watchLaterSlice";
import { addFavouriteMovie } from "../../features/favouriteMovies/favouriteMovies";
import BtnWatch from "../Atoms/BtnWatch";
import BtnDetails from "../Atoms/BtnDetails";
import { fetchPopularMovies } from "../../features/getPopularMoviesAPI/getPopuparMoviesSlice";
import Movie from "./Movie";

const AccountMovies = ({ movie, handleClickMovie, onClick }) => {
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
          title: movie.title,
          img: movie.backdrop_path,
        }),
      });
    } else {
      alert("you need to log in first");
    }
  };

  const deleteMovieFromFirestore = async () => {
    if (user?.email) {
      await deleteDoc(doc(db, "watchLaterMovies", `${movie.id}`));
      dispatch(deleteMovie({ id: movie.id }));
    } else {
      alert("you need to log in first");
    }
  };
  // const deleteMovieFromWatchLater = () => {
  //   dispatch(deleteMovie({ id: movie.id }));
  // };

  const addFavMovie = () => {
    dispatch(
      addFavouriteMovie({
        id: movie.id,
        title: movie.title,
        backdrop_path: movie.backdrop_path,
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
        // onClick={handleClickMovie}
        onClick={onClick}
        className="text-white relative p-2 flex gap-3 bg-blue-gray-400 bg-opacity-50 rounded"
      >
        <img
          className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px]"
          src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="w-full  text-white flex flex-col justify-between ml-10px">
          <div>
            <div className=" uppercase text-amber-300 text-center">
              {" "}
              {movie?.title}
            </div>
            <p className="w-full text-white">{movie?.overview}</p>
            {/* <div className="absolute top-[10px] left-[10px] flex gap-2">
            {like ? (
              <AiFillStar />
            ) : (
              <AiOutlineStar onClick={() => addFavouriteMovieStore()} />
              // <AiOutlineStar onClick={() => saveShow()} />
            )}
            {watchLater ? (
              <TiTick onClick={() => deleteMovieFromWatchLater()} />
            ) : (
              <MdOutlineWatchLater onClick={() => watchMovieLater()} />
            )}
          </div> */}
          </div>
          <div className="flex justify-between">
          <div className="flex gap-5">
            <BtnWatch />
            <Link to={`/${movie.id}`}>
              <BtnDetails />
            </Link>
          </div>
            <AiOutlineCloseCircle className="h-[2em] w-[2em] cursor-pointer hover:bg-gray-500 rounded-full"  onClick={() => deleteMovieFromFirestore()}/>
          </div>
        </div>
      </div>

    </>
  );
};

export default AccountMovies;
