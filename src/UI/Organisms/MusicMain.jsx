import React, { useEffect, useState } from "react";
// import requests from "../Requests";
import requests from "../../Requests";
import StarRating from "../../UI/Atoms/StarRating";
// import StarRating from "../Components/StarRating/StarRating";

const MusicMain = ({xxx}) => {
  const [movies, setMovies] = useState([]);
  const [mainMovie, setMainMovie] = useState(null);
  
  useEffect(() => {
    // console.log(xxx)
    const newMovie = movies.find(el => el.title === xxx)
    // console.log(movies)
  // console.log(newMovie)
    setMainMovie(newMovie)
    // console.log(xxx)
  }, [xxx])
  // console.log(xxx)

  const truncateDescription = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

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
      console.log(movie)
      setMainMovie(movie);
    }
  }, [movies]);

  if (!mainMovie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-[500px]">
        <div className="absolute w-full h-[500px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-[500px] object-cover"
          src={`https://image.tmdb.org/t/p/original${mainMovie?.backdrop_path}`}
          alt=""
        />
        <div className="absolute w-full top-[20%] p-4">
          <h1 className="text-3xl md:text-5xl mb-4">{mainMovie?.title}</h1>
          <div className="flex justify-between w-[150px] mb-5">
            <p>{mainMovie?.release_date.slice(0, 4)}</p>
            <div className="flex">
              <p>{mainMovie?.vote_average}</p>
              <StarRating />
            </div>
          </div>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%] text-gray-200">
            {truncateDescription(mainMovie?.overview, 200)}
          </p>
          <div className="w-[300px] flex justify-between my-8">
            <button className="bg-yellow-300 text-black px-5 py-5px">
              Watch
            </button>
            <button className="text-white px-5 py-5px border-2">
              Add List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicMain;
