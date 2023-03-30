import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovieId } from "../../features/chosenMovie/ChosenMovieSlice";
// import {FaHeart, FaRegHeart} from 'react-icons/fa'

import Movie from "./Movie";

const Row = ({ title, onData, movies }) => {
// const Row = ({ title, onData, fetchUrl }) => {
  // const [movieArr, setMovieArr] = useState([]);

//   const key = "acf837ccca44b10855aa8ef467ec0211";


// const movieId = useSelector(state => state.movieId.value)

  const dispatch = useDispatch();

  // useEffect(() => {
  //   fetch(fetchUrl)
  //     .then((res) => res.json())
  //     .then((response) => {
  //       setMovieArr(response.results);
  //       // console.log(title, response.results);
  //     });
  // }, [fetchUrl]);

  return (
    <>
      <h2 className="text-white">{title}</h2>
      <div className="flex">
        <div
          className="text-white w-full h-full whitespace-nowrap overflow-x-scroll scroll-smooth scrollbar-hide relative"
          id={"slider"}
        >
          {movies.map((movie) => (
            <Movie
              movie={movie}
              key={`${movie?.id}`}
              onClick={() => dispatch(setMovieId(movie.id))}
            />
          ))}
          {/* {newmovieArr} */}
        </div>
      </div>
    </>
  );
};

export default Row;
