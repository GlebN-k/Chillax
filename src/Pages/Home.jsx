import React, { useState, useEffect } from "react";
// import requests from "../Requests";
import Main from "../UI/Organisms/Main";
import Row from "../UI/Molecules/Row";
import { useSelector, useDispatch } from "react-redux";
import { fetchPopularMovies } from "./../features/getPopularMoviesAPI/getPopuparMoviesSlice";
import { fetchTopMovies } from "../features/topMoviesSlice/getTopMoviesThunk";
import { fetchUpComingMovies } from "../features/upComingMovies/getUpComingMoviesThunk";
import { fetchTrendingMovies } from "../features/trendingMovies/getTrendingMoviesThunk";
import SavedShows from "../UI/Molecules/SavedShows";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../Context/AuthContext";
import { addMoviesFromFirestore } from "../features/favouriteMovies/favouriteMovies";

const Home = () => {
  // const [trans, setTrans] = useState(null);
  const dispatch = useDispatch();

  // const {user} = UserAuth()

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, []);

  useEffect(() => {
    dispatch(fetchTopMovies());
  }, []);

  useEffect(() => {
    dispatch(fetchUpComingMovies());
  }, []);

  useEffect(() => {
    dispatch(fetchTrendingMovies());
  }, []);

  const topMovies = useSelector((state) => state.topMovies.movies);
  const popularMovies = useSelector((state) => state.popularMovies.movies);
  const upComingMovies = useSelector((state) => state.upComingMovies.movies);
  const trendingMovies = useSelector((state) => state.trendingMovies.movies);

  const unitedMoviesArr = topMovies.concat(
    popularMovies,
    upComingMovies,
    trendingMovies
  );
  // const handleData = (data) => {
  //   // let movieName = data?.innerText;
  //   // setTrans(movieName);
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };
// const fetchMyMovies = async () => {
//   const result = await onSnapshot(doc(db, "users", `${user?.email}`), (doc) =>  doc.data()?.savedShows)
//   console.log("new attempt", result)
//   // dispatch(addMoviesFromFirestore(result))
// }

//   useEffect(() => {
//     fetchMyMovies()
//     // console.log("from firebase", doc.data()?.savedShows);
//     // dispatch(addMoviesFromFirestore(movies))
//   }, []);

  return (
    <>
      <Main unitedMoviesArr={unitedMoviesArr} />

      <Row title="Up coming" movies={upComingMovies} />
      <Row title="Top Rated" movies={topMovies} />
      <Row title="Popular" movies={popularMovies} />
      <Row title="Trending" movies={trendingMovies} />
      <SavedShows />
    </>
  );
};

export default Home;

// import React, { useState, useEffect } from "react";
// import requests from "../../Requests";
// import Main from "../Main";
// import Row from "../Row/Row";

// const Home = () => {
//   //  let forUseEf = '';
//   let trans = null;
//   let count = 0;
//   // const [transData, setTransData] = useState('')

//   useEffect(() => {
//     console.log(++count);
//   }, [trans]);

//   const handleData = (data) => {
//     let movieName = data?.innerText;
//     console.log(movieName);
//     trans = movieName;
//     console.log(trans);
//     // return movieName;
//   };

//   // function handleData(data) {
//   //   // робота з даними, що були передані з дочірнього елементу
//   //   console.log(data.innerText);
//   // }

//   return (
//     <>
//       <Main xxx={handleData} />
//       <Row
//         onData={handleData}
//         title="Up coming"
//         fetchUrl={requests.requestUpcoming}
//       />
//       <Row title="Top Rated" fetchUrl={requests.requestTopRated} />
//       <Row title="Popular" fetchUrl={requests.requestPopular} />
//     </>
//   );
// };

// export default Home;
