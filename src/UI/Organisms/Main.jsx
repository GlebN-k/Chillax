import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player/lazy";
import { useSelector } from "react-redux";

import requests from "../../Requests";
import BtnWatch from "../Atoms/BtnWatch";
import StarRating from "../Atoms/StarRating";
import BtnDetails from "../Atoms/BtnDetails";

const Main = ({ unitedMoviesArr }) => {
  const key = "acf837ccca44b10855aa8ef467ec0211";
  const [movies, setMovies] = useState([]);
  const [mainMovie, setMainMovie] = useState(null);
  const [trailer, setTrailer] = useState("");
  // const [muted, setMuted] = useState(false)
  // const [genres, setGenres] = useState([]);
  const [watchPressed, setWatchPressed] = useState(false);
  const movieId = useSelector((state) => state.movieId.value.payload);
  // const [film, setFilm] = useState('');
  // console.log(movieId)

  // useEffect(() => {
  //   // fetch(
  //   //   `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US`
  //   // )
  //   //   .then((res) => res.json())
  //   //   .then((response) => {
  //   //     // setMovies(response.results);
  //   //     console.log("main movie", response);
  //   //     setMainMovie(response);
  //       // window.scrollTo({
  //       //   top: 0,
  //       //   behavior: "smooth",
  //       // });
  //       setMainMovie(movieId);
  //     });
  // }, [movieId]);

  useEffect(() => {
    const newMovie = unitedMoviesArr.find((el) => el.id === movieId);
    setMainMovie(newMovie);
  }, [movieId]);

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
        return response.results
      }).then(movieArr => {
        const movie = movieArr[Math.floor(Math.random() * movieArr.length)];
        setMainMovie(movie);
      });
  }, []);

  // useEffect(() => {
  //   if (movies.length > 0) {
  //     const movie = movies[Math.floor(Math.random() * movies.length)];
  //     console.log("first rende movie",movie);
  //     setMainMovie(movie);
  //   }
  // }, [movies]);

  const fetchMovieTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${
        mainMovie?.media_type === "tv" ? "tv" : "movie"
      }/${
        mainMovie?.id
      }?api_key=${key}&language=en-US&append_to_response=videos`
    ).then((response) => response.json());

    if (data?.videos) {
      const index = data.videos.results.findIndex(
        (item) => item.type === "Trailer"
      );
      setTrailer(data.videos.results[index].key);
    }
  };

  useEffect(() => {
    // if (!mainMovie) return;

    fetchMovieTrailer();
  }, [mainMovie]);

  const handleClick = () => {
    // console.log("watched pressed")
    setWatchPressed(true);
  };

  if (!mainMovie) {
    return <div className="text-white">Loading...</div>;
  }

  console.log("mainMovie", mainMovie);

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-[550px]">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-[550px] object-cover"
          src={`https://image.tmdb.org/t/p/original${mainMovie?.backdrop_path}`}
          alt=""
        />
        <div className="absolute w-full top-[20%] p-4">
          <h1 className="text-3xl md:text-5xl mb-4">{mainMovie?.title || mainMovie?.name}</h1>
          <div className="flex justify-between w-[150px] mb-5">
            {/* <p>{mainMovie?.release_date.slice(0, 4) || '1970'}</p> */}
            <div className="flex">
              <p>{mainMovie?.vote_average}</p>
              <StarRating />
            </div>
          </div>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%] text-gray-200">
            {truncateDescription(mainMovie?.overview, 200)}
          </p>
          <div className="w-[300px] flex justify-between my-8">
            <BtnWatch onClick={handleClick} />
            
            <Link to={`/${mainMovie.id}`}>
              <BtnDetails />
            </Link>
          </div>
        </div>
      </div>
      {watchPressed && (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailer}`}
          width="100%"
          height="100%"
          style={{ position: "absolute", top: "0", left: "0" }}
          playing
          // muted={muted}
        />
      )}

      {/* <button className="relative top-[-100px] left-10 z-80" onClick={() => setWatchPressed(false)}>X</button> */}
    </div>
  );
};

export default Main;
