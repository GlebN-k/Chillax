import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MoviesRow from "../UI/Molecules/MoviesRow";
import Pagination from "../UI/Molecules/Pagination";

const MoviesPage = () => {
  let { title } = useParams();
  const movieGroupName = title
  title = title.toLowerCase()+ "Movies";
  let name = title


  if (title.includes(" ")) {
    name = deleteSpaces(title);
  }

  function deleteSpaces(str) {
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

  const movies = useSelector((state) => state[name]);


  return (
    <div className="mx-auto w-[80%]">
      <div className="relative h-[100px] w-full z-10 "></div>
      <h2 className="text-white text-2xl">{movieGroupName}</h2>
      <MoviesRow title={name} movies={movies?.movies || movies?.cartoons} />
      <Pagination total_pages={movies?.total_pages} />
    </div>
  );
};

export default MoviesPage;
