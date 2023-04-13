import React, { useEffect, useMemo } from "react";
import Main from "../UI/Organisms/Main";
import Row from "../UI/Molecules/Row";
import { useSelector, useDispatch } from "react-redux";
import { fetchPopularMovies } from "../features/getPopularMoviesAPI/getPopuparMoviesSlice";
import { fetchTopMovies } from "../features/topMoviesSlice/getTopMoviesThunk";
import { fetchUpComingMovies } from "../features/upComingMovies/getUpComingMoviesThunk";
import { fetchTrendingMovies } from "../features/trendingMovies/getTrendingMoviesThunk";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { addMoviesFromFirestore } from "../features/favouriteMovies/favouriteMovies";
import { getMoviesFromFirestore } from "../features/watchLaterMovies/watchLaterSlice";
import { fetchCartoons } from "../features/cartoons/cartoonsThunk";
import { fetchSeries } from "../features/series/seriesThunk";
import { fetchNetflixSeries } from "../features/netflixSeries/netflixSeriesThunk";
import { fetchAllMovieGenres } from "../features/allMovieGenres/allMovieGenresThunk";
import { getChosenFilmSuccess } from "../features/chosenFilm/ChosenFilmSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const myMovies = useSelector((state) => state.favouriteMovies);
  const { user } = UserAuth();
  const topMovies = useSelector((state) => state.topRatedMovies.movies);
  const popularMovies = useSelector((state) => state.popularMovies.movies);
  const upComingMovies = useSelector((state) => state.upComingMovies.movies);
  const trendingMovies = useSelector((state) => state.trendingMovies.movies);
  const cartoons = useSelector((state) => state.cartoonsMovies.cartoons);
  const series = useSelector((state) => state.seriesMovies.movies);
  const netflixSeries = useSelector(
    (state) => state.netflixSeriesMovies.movies
  );

  const unitedMoviesArr = useMemo(() => {
    return topMovies.concat(
      popularMovies,
      upComingMovies,
      trendingMovies,
      series,
      netflixSeries
    );
  }, [
    topMovies,
    popularMovies,
    upComingMovies,
    trendingMovies,
    series,
    netflixSeries,
  ]);

  function getWatchLaterMoviesFirestore() {
    return new Promise((resolve, reject) => {
      getDoc(doc(db, "users", `${user?.email}`)).then((res) =>
        resolve(res?.data().watchLaterMovies)?.catch((res) => reject(res))
      );
    });
  }

  useEffect(() => {
    getWatchLaterMoviesFirestore(user?.email)
      .then((res) => dispatch(getMoviesFromFirestore(res)))
      .catch((error) => console.log(error));
  }, [user?.email]);

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchTopMovies());
    dispatch(fetchUpComingMovies());
    dispatch(fetchTrendingMovies());
    dispatch(fetchCartoons());
    dispatch(fetchSeries());
    dispatch(fetchNetflixSeries());
    dispatch(fetchAllMovieGenres());
  }, [dispatch]);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  function getSavedShows(email) {
    return new Promise((resolve, reject) => {
      const docRef = doc(db, "users", email);
      getDoc(docRef)
        .then((doc) => {
          resolve(doc.data().savedShows);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  useEffect(() => {
    const movie =
      popularMovies[Math.floor(Math.random() * popularMovies.length)];
    dispatch(getChosenFilmSuccess(movie));
  }, [dispatch, popularMovies]);

  useEffect(() => {
    if (myMovies.length > 0) return;

    getSavedShows(user?.email)
      .then((res) => {
        dispatch(addMoviesFromFirestore(res));
      })
      .catch((error) => console.log(error));
  }, [user?.email]);

  return (
    <>
      <Main unitedMoviesArr={unitedMoviesArr} />
      <Row title="Up coming" movies={upComingMovies} rowId="1" />
      <Row title="Top Rated" movies={topMovies} rowId="2" />
      <Row title="Netflix series" movies={netflixSeries} rowId="3" />
      <Row title="Popular" movies={popularMovies} rowId="4" />
      <Row title="Trending" movies={trendingMovies} rowId="5" />
      <Row title="Cartoons" movies={cartoons} rowId="6" />
      <Row title="Series" movies={series} rowId="7" />
      <div className="text-white px-5 text-2xl tracking-wider">
        Haven`t found something interesting? Try our{" "}
        <Link to="/filters">
          <span className="text-blue-500" onClick={handleClick}>
            filters
          </span>
        </Link>
      </div>
    </>
  );
};

export default Home;
