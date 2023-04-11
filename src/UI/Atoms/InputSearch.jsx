import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchMovies } from "../../features/searchMovies/searchMoviesThunk";
import SearchInputMovie from "../Molecules/SearchInputMovie";

const InputSearch = ({ onClick }) => {
  const [value, setValue] = useState("");
  const moviesArray = useSelector((state) => state.searchMovies.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (value.length < 3) {
      return;
    }
    dispatch(fetchSearchMovies(value));
  }, [dispatch, value]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/searchResults/${value}`);
      onClick()
    }
  };

  return (
    <div className="absolute left-8">
      <input
        className="h-[30px] w-[250px] md:w-[300px] border-b-2 bg-transparent opacity-90 focus:border-transparent"
        placeholder="enter movie..."
        value={value}
        onChange={handleInput}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <div className="flex flex-col absolute top-8 left-0">
        {moviesArray.map((movie, index) => {
          if (index <= 4) {
            return (
              <Link to={`/${movie?.hasOwnProperty("name") ? "tv" : "movie"}/${movie.id}`}>
                <SearchInputMovie
                  movie={movie}
                  hideLoupe={onClick}
                />
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};

export default InputSearch;
