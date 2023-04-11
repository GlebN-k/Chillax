import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MoviesRow from "../UI/Molecules/MoviesRow";
import Pagination from "../UI/Molecules/Pagination";

const SearchResults = () => {
  const movies = useSelector((state) => state.searchMovies);
  const {value} = useParams()

  return (
    <div className=" mx-auto w-[80%]">
      <div className="relative h-[100px] w-full z-10"></div>
      <h2 className="text-white text-2xl">All results for "<span className="text-amber-400">{value}</span>"</h2>
      <MoviesRow title="Search Results" movies={movies.movies} />
      <Pagination total_pages={movies.total_pages} />
    </div>
  );
};

export default SearchResults;
