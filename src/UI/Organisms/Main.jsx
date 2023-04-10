import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player/lazy";
import { useSelector } from "react-redux";

import BtnWatch from "../Atoms/BtnWatch";
import StarRating from "../Atoms/StarRating";
import BtnDetails from "../Atoms/BtnDetails";
import { key } from "../../requests";

const Main = ({ unitedMoviesArr }) => {
  const [trailer, setTrailer] = useState("");
  const [watchPressed, setWatchPressed] = useState(false);
  const chosenFilm = useSelector((state) => state.chosenFilm.movie);

  // to reduce text description of the movie if it`s too long
  const truncateDescription = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  // to fetch movie trailer from YouTube
  const fetchMovieTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${
        chosenFilm.hasOwnProperty("name") ? "tv" : "movie"
      }/${
        chosenFilm?.id
      }?api_key=${key}&language=en-US&append_to_response=videos`
    ).then((response) => response.json());

    if (data?.videos) {
      console.log("data.videos", data.videos);
      const index = data.videos.results.findIndex(
        (item) => item.type === "Trailer"
      );
      setTrailer(data.videos.results[index].key);
    }
  };

  useEffect(() => {
    fetchMovieTrailer();
  }, [chosenFilm]);

  const handleClick = (e) => {
    e.stopPropagation();
    setWatchPressed(true);
  };

  console.log("mainMovie", chosenFilm);

  // to close window with the movie trailer
  useEffect(() => {
    const handleContainerClick = (event) => {
      if (watchPressed) {
        console.log(event.target);
        setWatchPressed(false);
      }
    };
    document.addEventListener("click", handleContainerClick);

    return () => {
      document.removeEventListener("click", handleContainerClick);
    };
  }, [watchPressed]);

  return (
    <div className="h-[550px]">
      <div className="w-full h-[650px] text-white absolute">
        <div className="w-full h-[650px]">
          <div className="absolute w-full h-[650px] bg-gradient-to-r from-black"></div>
          <img
            className="w-full h-[650px] object-cover"
            src={`https://image.tmdb.org/t/p/original${chosenFilm?.backdrop_path}`}
            alt={`${chosenFilm?.title || chosenFilm?.name}`}
          />
          <div className="absolute w-full top-[25%] p-4">
            <h1 className="text-3xl md:text-5xl mb-4">
              {chosenFilm?.title || chosenFilm?.name}
            </h1>
            <div className="flex justify-between w-[50%] md:w-[20%] lg:w-[10%] mb-5 text-lg">
              <div className="flex">
                <p>{chosenFilm?.vote_average}</p>
                <StarRating />
              </div>
              <p className="text-gray-400">
                {(
                  chosenFilm?.release_date || chosenFilm?.first_air_date
                )?.slice(0, 4)}
              </p>
            </div>
            <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%] text-gray-200">
              {truncateDescription(chosenFilm?.overview, 200)}
            </p>
            <div className="w-[100%] md:w-[30%] flex justify-between my-8">
              <BtnWatch onClick={handleClick} />

              <Link
                to={`/${chosenFilm?.hasOwnProperty("name") ? "tv" : "movie"}/${
                  chosenFilm?.id
                }`}
              >
                <BtnDetails />
              </Link>
            </div>
          </div>
        </div>
        {watchPressed && (
          <ReactPlayer
            className="z-50"
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="75%"
            height="75%"
            style={{ position: "absolute", top: "5%", left: "12%" }}
            playing
            controls={true}
            pip={true}
            allow="picture-in-picture"
          />
        )}
      </div>
    </div>
  );
};

export default Main;
