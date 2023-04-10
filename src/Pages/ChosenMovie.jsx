import React, { useState, useEffect } from "react";
import StarRating from "../UI/Atoms/StarRating";
import { useParams } from "react-router-dom";
import BtnWatch from "../UI/Atoms/BtnWatch";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import { BsPlusCircle } from "react-icons/bs";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { AiTwotoneLike, AiOutlineLike } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { db } from "../firebase";
import { addFavouriteMovie } from "../features/favouriteMovies/favouriteMovies";
import {
  addMovie,
  deleteMovie,
} from "../features/watchLaterMovies/watchLaterSlice";
import Row from "../UI/Molecules/Row";
import { UserAuth } from "../context/AuthContext";
import { fetchRecommendedMovies } from "../features/recommendedMovies/recommendedMoviesThunk";
import { fetchCreditsMovie } from "../features/creditsMovie/creditsMovieThunk";
import ActorProfile from "../UI/Atoms/ActorProfile";
import MovieGenre from "../UI/Atoms/MovieGenre";
import { fetchChosenFilm } from "../features/chosenFilm/chosenFilmThunk";
import { deleteFavouriteMovie } from "../features/favouriteMovies/favouriteMovies";
import { key } from "../requests";
 
const ChosenMovie = () => {
  const [like, setLike] = useState(false);
  const [watchLater, setWatchLater] = useState(false);
  const dispatch = useDispatch();
  const [watchPressed, setWatchPressed] = useState(false);
  const [trailer, setTrailer] = useState("");
  const filmParams = useParams();
  const { user } = UserAuth();
  const movieId = doc(db, "users", `${user?.email}`);
  const recommendedMoviesArr = useSelector(
    (state) => state.recommendedMovies.movies
  );
  const movieCredits = useSelector((state) => state.creditsMovie.value);
  const filmInfo = useSelector((state) => state.chosenFilm.movie);
  const favouriteMovies = useSelector((state) => state.favouriteMovies);
  const watchLaterArr = useSelector((state) => state.watchLater);

  useEffect(() => {
    dispatch(fetchChosenFilm(filmParams));
  }, [filmParams]);

  useEffect(() => {
    dispatch(fetchRecommendedMovies(filmInfo));
    dispatch(fetchCreditsMovie(filmInfo));
  }, [filmInfo, dispatch]);

  // check if chosen movie is already added to favourite or to saved movies
  useEffect(() => {
    if (favouriteMovies.find((item) => item.id == filmParams.id)) {
      setLike(true);
    } else {
      setLike(false);
    }
    if (watchLaterArr.find((item) => item.id === filmInfo.id)) {
      setWatchLater(true);
    } else {
      setWatchLater(false);
    }
  }, [favouriteMovies, filmInfo, filmParams, watchLaterArr]);

  const fetchMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${
        filmInfo.hasOwnProperty("name") ? "tv" : "movie"
      }/${filmInfo?.id}?api_key=${key}&language=en-US&append_to_response=videos`
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
    fetchMovie();
  }, [filmInfo]);

  const handleClick = (e) => {
    e.stopPropagation();
    console.log("watched pressed");
    setWatchPressed(true);
  };

  // adding movie to the Firestore (to saved movies collection)
  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      await updateDoc(movieId, {
        savedShows: arrayUnion({
          id: filmInfo.id,
          title: filmInfo.title || filmInfo.name,
          backdrop_path: filmInfo.backdrop_path,
          overview: filmInfo.overview,
          type: `${filmInfo.hasOwnProperty("name") ? "tv" : "movie"}`,
        }),
      });
    } else {
      alert("you need to log in first");
    }
  };

  // adding movie to the Redux store (to Favourites movies)
  const addFavMovie = () => {
    dispatch(
      addFavouriteMovie({
        id: filmInfo.id,
        title: filmInfo.title || filmInfo.name,
        backdrop_path: filmInfo.backdrop_path,
        overview: filmInfo.overview,
        type: `${filmInfo.hasOwnProperty("name") ? "tv" : "movie"}`,
      })
    );
  };

  const addFavouriteMovieStore = () => {
    saveShow();
    addFavMovie();
  };

  // adding movie to the Firestore (to watchLater movies collection)
  const saveWatchLaterFirebase = async () => {
    if (user?.email) {
      await updateDoc(movieId, {
        watchLaterMovies: arrayUnion({
          id: filmInfo.id,
          title: filmInfo.title || filmInfo.name,
          backdrop_path: filmInfo.backdrop_path,
          overview: filmInfo.overview,
          type: `${filmInfo.hasOwnProperty("name") ? "tv" : "movie"}`,
        }),
      });
    } else {
      alert("you need to log in first");
    }
  };

  // adding movie to the Redux store (to watchLater movies)
  const watchMovieLater = () => {
    if (user?.email) {
      setWatchLater(!watchLater);
      saveWatchLaterFirebase();
      dispatch(
        addMovie({
          id: filmInfo.id,
          title: filmInfo.title || filmInfo.name,
          backdrop_path: filmInfo.backdrop_path,
          overview: filmInfo.overview,
          type: `${filmInfo.hasOwnProperty("name") ? "tv" : "movie"}`,
        })
      );
    } else {
      alert("you need to log in first");
    }
  };

  // delete movie from Firestore favourite movies collection
  const deleteFavouriteMovieFirestore = async () => {
    const movieRef = doc(db, "users", `${user?.email}`);
    setLike(false);
    dispatch(deleteFavouriteMovie({ id: filmInfo.id }));
    try {
      const results = favouriteMovies.filter((item) => item.id !== filmInfo.id);
      await updateDoc(movieRef, {
        savedShows: results,
      });
    } catch (error) {
      alert("error", error);
    }
  };

  // delete movie from Firestore watchLater movies collection
  const deleteSavedMovieFirestore = async () => {
    const movieRef = doc(db, "users", `${user?.email}`);
    setWatchLater(false);
    dispatch(deleteMovie({ id: filmInfo.id }));
    try {
      const results = watchLaterArr.filter((item) => item.id !== filmInfo.id);
      await updateDoc(movieRef, {
        watchLaterMovies: results,
      });
    } catch (error) {
      alert("error", error);
    }
  };

  // to close youtube window
  useEffect(() => {
    const handleContainerClick = (event) => {
      if (watchPressed) {
        setWatchPressed(false);
      }
    };
    document.addEventListener("click", handleContainerClick);

    return () => {
      document.removeEventListener("click", handleContainerClick);
    };
  }, [watchPressed]);

  console.log("filmInfo", filmInfo);

  return (
    <div className="relative">
      <div className="relative h-[100px] w-full z-10"></div>
      {/* {backgroundOnWatching && <div className="w-[100%] h-[100%] bg-black bg-opacity-50"></div>} */}
      <div className=" relative flex flex-col items-center sm:flex-row sm:w-fit justify-center z-10 bg-black bg-opacity-30  m-auto rounded">
        {/* <div className=" relative flex flex-col sm:flex-row justify-center z-10 bg-black bg-opacity-30 w-fit m-auto rounded"> */}
        <img
          className="w-[250px] h-[375px] sm:w-[300px] sm:h-[450px] md:w-[400px] md:h-[600px]  rounded"
          // className="w-[400px] h-[600px] rounded"
          src={`https://image.tmdb.org/t/p/original${filmInfo?.poster_path}`}
          alt={filmInfo?.name || filmInfo?.title}
        />
        {/* <div className="w-[300px] md:max-w-[500px]  text-white"> */}
        <div className="w-[300px] md:w-[500px]  text-white">
          <div className=" top-[20%] p-4">
            <h1 className="text-white text-2xl md:text-4xl mb-4">
              {filmInfo?.title || filmInfo?.name}
            </h1>
            <div className="flex flex-wrap gap-1  text-center pb-4">
              {filmInfo?.genres?.map((genre) => {
                return <MovieGenre genre={genre} />;
              })}
            </div>
            <div className="flex justify-between w-[150px] mb-5">
              {filmInfo?.vote_average > 0 && (
                <div className="flex">
                  <p>{filmInfo?.vote_average}</p>
                  <StarRating />
                </div>
              )}
              <div>
                {filmInfo?.release_date?.slice(0, 4) ||
                  filmInfo?.first_air_date?.slice(0, 4)}
              </div>
            </div>
            <p className="w-full text-justify indent-4 text-gray-200">{filmInfo?.overview}</p>
            <div className="flex flex-wrap justify-center gap-3 items-start mt-8 w-full ">
              {movieCredits?.map((actor, index) => {
                if (
                  (window.innerWidth < 768 && index < 3) ||
                  (window.innerWidth >= 768 && index < 5)
                ) {
                  return <ActorProfile actor={actor} />;
                }
              })}
            </div>
            <div className="w-full flex justify-between my-8">
              <BtnWatch onClick={handleClick} />
              <div className="flex gap-5">
                {like ? (
                  <AiTwotoneLike
                    className="h-[30px] w-[30px] cursor-pointer text-yellow-500 stroke-current fill-current"
                    onClick={() => deleteFavouriteMovieFirestore()}
                  />
                ) : (
                  <AiOutlineLike
                    className="h-[30px] w-[30px] cursor-pointer"
                    onClick={() => addFavouriteMovieStore()}
                  />
                )}
                {watchLater ? (
                  <TiTick
                    className="h-[30px] w-[30px] cursor-pointer text-yellow-500 "
                    onClick={() => deleteSavedMovieFirestore()}
                  />
                ) : (
                  <BsPlusCircle
                    className="h-[30px] w-[30px] cursor-pointer"
                    onClick={() => watchMovieLater()}
                  />
                )}
              </div>
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
          style={{ position: "absolute", top: "5%", left: "12%" }}
          playing
          // muted={muted}
          // pip="true"
          controls={true}
          pip={true}
          allow="picture-in-picture"
        />
        // </div>
      )}

      <div className="absolute w-full top-0">
        <div className="absolute w-full h-[100vh] bg-black opacity-60"></div>
        <img
          className="w-full h-[100vh] object-cover"
          src={`https://image.tmdb.org/t/p/original${filmInfo?.backdrop_path}`}
          alt=""
        />
      </div>

      {recommendedMoviesArr.length > 0 && (
        <Row
          className="mt-[40px] relative z-30"
          title="You may also like"
          movies={recommendedMoviesArr}
        />
      )}
    </div>
  );
};

export default ChosenMovie;
