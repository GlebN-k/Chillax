import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const InputSearch = ({onClick}) => {
  const [value, setValue] = useState("");
  const [moviesArray, setMoviesArray] = useState([]);
  const key = "acf837ccca44b10855aa8ef467ec0211";
  //   const query = 'harry'

  useEffect(() => {
    if (value.length < 3) {
      return;
    }
    try {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${value}`
      )
        .then((res) => res.json())
        .then((response) => {
          setMoviesArray(response.results);
          console.log(moviesArray);
        });
    } catch (error) {
      alert(error);
    }
  }, [value]);

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative">
      <input
        className="h-[30px] w-[400px] border-b-2 bg-transparent opacity-90 focus:border-transparent"
        placeholder="find film"
        value={value}
        onChange={handleInput}
      />
      <div className="flex flex-col absolute top-8 left-0">
        {moviesArray.map((movie) => (
          <Link to={`/${movie.id}`}>
          <div className="bg-white px-2 cursor-pointer text-black hover:bg-blue-300 w-[500px]" onClick={onClick}>
            {movie?.title}
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InputSearch;
