import React, { useState, useEffect, useMemo } from "react";
import Main from "../UI/Organisms/Main";
import Row from "../UI/Molecules/Row";
import { useSelector, useDispatch } from "react-redux";
import { fetchPopularMovies } from "./../features/getPopularMoviesAPI/getPopuparMoviesSlice";
import { fetchTopMovies } from "../features/topMoviesSlice/getTopMoviesThunk";
import { fetchUpComingMovies } from "../features/upComingMovies/getUpComingMoviesThunk";
import { fetchTrendingMovies } from "../features/trendingMovies/getTrendingMoviesThunk";
import SavedShows from "../UI/Molecules/SavedShows";
import { onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../Context/AuthContext";
import { addMoviesFromFirestore } from "../features/favouriteMovies/favouriteMovies";

const Home = () => {
  const dispatch = useDispatch();
  const myMovies = useSelector(state => state.favouriteMovies)

  const { user } = UserAuth();

  // const memoizedUser = useMemo(() => {
  //   return user;
  // }, [user])

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchTopMovies());
    dispatch(fetchUpComingMovies());
    dispatch(fetchTrendingMovies());
  }, []);

  const topMovies = useSelector((state) => state.topRatedMovies.movies);
  const popularMovies = useSelector((state) => state.popularMovies.movies);
  const upComingMovies = useSelector((state) => state.upComingMovies.movies);
  const trendingMovies = useSelector((state) => state.trendingMovies.movies);

  const unitedMoviesArr = useMemo(() => {
    return topMovies.concat(popularMovies, upComingMovies, trendingMovies);
  }, [topMovies, popularMovies, upComingMovies, trendingMovies]);

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
    if(myMovies.length > 0) return

    getSavedShows(user?.email)
      .then((res) => {
        dispatch(addMoviesFromFirestore(res));
        console.log('i made new action');
      })
      .catch((error) => console.log(error));
  }, [user?.email]);

  return (
    <>
      <Main unitedMoviesArr={unitedMoviesArr} />
      <Row title="Up coming" movies={upComingMovies} />
      <Row title="Top Rated" movies={topMovies} />
      <Row title="Popular" movies={popularMovies} />
      <Row title="Trending" movies={trendingMovies} />
    </>
  );
};

export default Home;


// import React, { useState, useEffect, useMemo } from "react";
// // import requests from "../Requests";
// import Main from "../UI/Organisms/Main";
// import Row from "../UI/Molecules/Row";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchPopularMovies } from "./../features/getPopularMoviesAPI/getPopuparMoviesSlice";
// import { fetchTopMovies } from "../features/topMoviesSlice/getTopMoviesThunk";
// import { fetchUpComingMovies } from "../features/upComingMovies/getUpComingMoviesThunk";
// import { fetchTrendingMovies } from "../features/trendingMovies/getTrendingMoviesThunk";
// import SavedShows from "../UI/Molecules/SavedShows";
// import { onSnapshot, doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase";
// import { UserAuth } from "../Context/AuthContext";
// import { addMoviesFromFirestore } from "../features/favouriteMovies/favouriteMovies";

// const Home = () => {
//   // const [trans, setTrans] = useState(null);
//   const dispatch = useDispatch();

//   const { user } = UserAuth();

//   // function getUser() {
//   //   const { user } = UserAuth();
//   //   return user;
//   // }

//   // const memoizedUser = useMemo(() => {
//   //   return someFunction(user)
//   // }, [user])

//   // const [user, setUser] = useState(UserAuth().user)

//   useEffect(() => {
//     dispatch(fetchPopularMovies());
//   }, []);

//   useEffect(() => {
//     dispatch(fetchTopMovies());
//   }, []);

//   useEffect(() => {
//     dispatch(fetchUpComingMovies());
//   }, []);

//   useEffect(() => {
//     dispatch(fetchTrendingMovies());
//   }, []);

//   const topMovies = useSelector((state) => state.topMovies.movies);
//   const popularMovies = useSelector((state) => state.popularMovies.movies);
//   const upComingMovies = useSelector((state) => state.upComingMovies.movies);
//   const trendingMovies = useSelector((state) => state.trendingMovies.movies);

//   const unitedMoviesArr = topMovies.concat(
//     popularMovies,
//     upComingMovies,
//     trendingMovies
//   );

//   function getSavedShows(email) {
//     console.log("email", email)
//     return new Promise((resolve, reject) => {
//       const docRef = doc(db, "users", email);
//       getDoc(docRef)
//         .then((doc) => {
//           // if (doc.exists()) {
//             resolve(doc.data().savedShows);
//           // } else {
//           //   resolve([]);
//           // }
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
//   }



//   useEffect(() => {
//     getSavedShows(user?.email)
//       .then((res) => {
//         console.log("fffiiirree", res);
//         dispatch(addMoviesFromFirestore(res));
//       })
//       .catch((error) => console.log(error));

//     // dispatch(addMoviesFromFirestore(getSavedShows(user?.email)))
//   }, [user?.email]);

//   // const handleData = (data) => {
//   //   // let movieName = data?.innerText;
//   //   // setTrans(movieName);
//   //   window.scrollTo({
//   //     top: 0,
//   //     behavior: "smooth",
//   //   });
//   // };
//   // const fetchMyMovies = async () => {
//   //   const result = await onSnapshot(doc(db, "users", `${user?.email}`), (doc) =>  doc.data()?.savedShows)
//   //   console.log("new attempt", result)
//   //   // dispatch(addMoviesFromFirestore(result))
//   // }

//   //   useEffect(() => {
//   //     fetchMyMovies()
//   //     // console.log("from firebase", doc.data()?.savedShows);
//   //     // dispatch(addMoviesFromFirestore(movies))
//   //   }, []);

//   return (
//     <>
//       <Main unitedMoviesArr={unitedMoviesArr} />

//       <Row title="Up coming" movies={upComingMovies} />
//       <Row title="Top Rated" movies={topMovies} />
//       <Row title="Popular" movies={popularMovies} />
//       <Row title="Trending" movies={trendingMovies} />
//       {/* <SavedShows /> */}
//     </>
//   );
// };

// export default Home;
