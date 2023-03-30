import React, { useState, useEffect } from "react";
import { UserAuth } from "../../Context/AuthContext";
import { db } from "../../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addMoviesFromFirestore } from "../../features/favouriteMovies/favouriteMovies";
import SpecialFunc from "./specialFunc";

const SavedShows = () => {
  const [movies, setMovies] = useState([]);

  const dispatch = useDispatch();

  const { user } = UserAuth();

  //   const fetchMovies = async () => {
  //     const result = await onSnapshot(
  //       doc(db, "users", `${user?.email}`),
  //       (doc) => {
  //         return doc.data()?.savedShows;
  //       }
  //     )



  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
    // console.log("from firebase", doc.data()?.savedShows);
    // dispatch(addMoviesFromFirestore(movies))
  }, [user?.email]);

  // await onSnapshot(
  //   doc(db, "users", `${user?.email}`),
  //   (doc) => {
  //     return doc.data()?.savedShows;
  //   }
  // ).then((response) => dispatch(addMoviesFromFirestore(response)));
  // const data = await

  //   useEffect(() => {
  //     // fetchMovies();
  //     dispatch(addMoviesFromFirestore(fetchMovies()))
  //     // onSnapshot(doc(db,"users", `${user?.email}`), (doc) => {
  //     //     // setMovies(doc)
  //     //     return doc.data()?.savedShows
  //     // dispatch(addMoviesFromFirestore(doc.data()?.savedShows))
  //     // console.log("doc", doc.data()?.savedShows)
  //   }, []);

  return <div className="text-white">{movies && <SpecialFunc movies={movies}/>}</div>;
};

export default SavedShows;
