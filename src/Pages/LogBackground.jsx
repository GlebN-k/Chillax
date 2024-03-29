import React, { useEffect, useState } from "react";
import requests from "../requests";

const LogBackground = () => {
  const [movies, setMovies] = useState([]);
  const [mainMovie, setMainMovie] = useState(null);

  useEffect(() => {
    fetch(requests.requestPopular)
      .then((res) => res.json())
      .then((response) => {
        setMovies(response.results);
      });
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const movie = movies[Math.floor(Math.random() * movies.length)];
      console.log(movie);
      setMainMovie(movie);
    }
  }, [movies]);

  if (!mainMovie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-[100vh]">
      <div className="absolute w-full h-[100vh] bg-gradient-to-r from-black"></div>
      <img
        className="w-full h-[100vh] object-cover"
        src={`https://image.tmdb.org/t/p/original${mainMovie?.backdrop_path}`}
        alt=""
      />
    </div>
  );
};

export default LogBackground;
