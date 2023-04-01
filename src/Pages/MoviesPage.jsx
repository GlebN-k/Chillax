import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MoviesRow from "../UI/Molecules/MoviesRow";
import Row from "../UI/Molecules/Row";

const MoviesPage = () => {
  let { title } = useParams();
  const movieGroupName = title
  title = title.toLowerCase()+ "Movies";
  let name = title
  console.log("title1", title);

  if (title.includes(" ")) {
    name = killSpaces(title);
  }

  function killSpaces(str) {
    let newStr = "";
    let result = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i - 1] === " ") {
        newStr += str[i].toUpperCase();
      } else {
        newStr += str[i];
      }
    }
    for (let i = 0; i < newStr.length; i++) {
      if (newStr[i] !== " ") {
        result += newStr[i];
      }
    }
    return result;
  }

  // const name = useParams().title.toLowerCase() + "Movies";
  console.log("title", name);

  const movies = useSelector((state) => state[name].movies);
  console.log("movies", movies);

  //   const topMovies = useSelector((state) => state.topMovies.movies);
  //   const popularMovies = useSelector((state) => state.popularMovies.movies);
  //   const upComingMovies = useSelector((state) => state.upComingMovies.movies);
  //   const trendingMovies = useSelector((state) => state.trendingMovies.movies);

  return (
    <div className=" mx-auto w-[80%]">
      <div className="relative h-[100px] w-full z-10"></div>
      <h2 className="text-white text-2xl">{movieGroupName} movies</h2>
      <MoviesRow title={name} movies={movies} />
    </div>
  );
};

export default MoviesPage;
