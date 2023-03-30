import React, { useState, useEffect, useRef } from "react";
// import { BiLike, BiDislike } from "react-icons/bi";
import StarRating from "../UI/Atoms/StarRating";
import { useParams } from "react-router-dom";
import BtnWatch from "../UI/Atoms/BtnWatch";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux"

import requests from "../Requests";
import Row from "../UI/Molecules/Row"

const ChosenMovie = ({ movie, handleClickMovie }) => {
  const [watchPressed, setWatchPressed] = useState(false);
  const [trailer, setTrailer] = useState("");
  const [muted, setMuted] = useState(false);
  const film = useParams();
  const key = "acf837ccca44b10855aa8ef467ec0211";


// const movieId = useSelector(state => state.value)

  const [backgroundOnWatching, setBackgroundOnWatching] = useState(true);

  // const [movies, setMovies] = useState([]);
  const [mainMovie, setMainMovie] = useState(null);

  const recommendationsUrl = `https://api.themoviedb.org/3/movie/${film.id}/recommendations?api_key=${key}&language=en-US&page=1`
  console.log("recom", recommendationsUrl);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${film.id}?api_key=${key}&language=en-US`
    )
      .then((res) => res.json())
      .then((response) => {
        // setMovies(response.results);
        console.log('chosen movie', response);
        setMainMovie(response);
      });
  }, [film]);

  const fetchMovie = async () => {
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

    console.log(data);
  };

  useEffect(() => {
    // if (!mainMovie) return;

    fetchMovie();
  }, [mainMovie]);

  const handleClick = (e) => {
    e.stopPropagation()
    console.log("watched pressed");
    setWatchPressed(true);
  };

  const [like, setLike] = useState(true);

  // const playerRef = useRef();

  useEffect(() => {
    const handleContainerClick = (event) => {
      if (watchPressed) {
        console.log(event.target);
        // console.log(playerRef.current);
        setWatchPressed(false);
      }
    };
    document.addEventListener("click", handleContainerClick);

    return () => {
      document.removeEventListener("click", handleContainerClick);
    };
  }, [watchPressed]);

  return (
    <div className="relative">
      <div className="relative h-[100px] w-full z-10"></div>
      {/* {backgroundOnWatching && <div className="w-[100%] h-[100%] bg-black bg-opacity-50"></div>} */}
      <div className=" relative  flex justify-center z-10">
        {/* <div className="z-10  flex justify-center top-[150px] left-[20%]"> */}
        <img
          className="w-[400px] h-[600px] "
          src={`https://image.tmdb.org/t/p/original${mainMovie?.poster_path}`}
          alt=""
        />
        <div className="w-[500px] text-white">
          <div className=" top-[20%] p-4">
            <h1 className="text-white text-3xl md:text-5xl mb-4">
              {mainMovie?.title || mainMovie?.name}
            </h1>
            <div className="flex justify-between w-[150px] mb-5">
              {/* <p>{mainMovie?.release_date.slice(0, 4)}</p> */}
              {mainMovie?.vote_average > 0 && <div className="flex">
                <p>{mainMovie?.vote_average}</p>
                <StarRating />
              </div>}
            </div>
            <p className="w-full  text-gray-200">{mainMovie?.overview}</p>
            <div className="w-[300px] flex justify-between my-8">
              <BtnWatch onClick={handleClick} />

              <button className="text-white px-5 py-5px border-2">
                Add List
              </button>
            </div>
          </div>
        </div>
      </div>

      {watchPressed && (
        // <div className="absolute pt-[56.25%] z-50">
        <ReactPlayer
          className="z-50"
          url={`https://www.youtube.com/watch?v=${trailer}`}
          width="75%"
          height="75%"
          style={{ position: "absolute", top: "15%", left: "12%" }}
          playing
          muted={muted}
          pip="true"
        />
        // </div>
      )}

      <div className="absolute w-full top-0 ">
        <div className="absolute w-full h-[100vh] bg-black opacity-60"></div>
        <img
          className="w-full h-[100vh]"
          src={`https://image.tmdb.org/t/p/original${mainMovie?.backdrop_path}`}
          alt=""
        />
      </div>

      {/* <Row className="mt-[40px] relative z-30"
        // onData={handleData}
        title="You may also like"
        fetchUrl={recommendationsUrl}
      /> */}
    </div>
  );
};

export default ChosenMovie;
