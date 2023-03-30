import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchPopularMovies } from "../features/getPopularMoviesAPI/getPopuparMoviesSlice";
// import { fetchPopularMovies } from "../features/getPopularMoviesAPI/getPopuparMoviesSlice";

import StarRating from "../UI/Atoms/StarRating";
import AccountMovie from "../UI/Molecules/AccountMovie";
import SavedShows from "../UI/Molecules/SavedShows";
import UsersList from "../UI/Molecules/UsersList";
// import { useSelector } from "react-redux";
// import Movie from "../UI/Molecules/Movie";

const Account = () => {
  const [arr, setArr] = useState([]);

  // const favouriteMovies = 

  const movies = useSelector((state) => state.watchLater);

  const favouriteMovies = useSelector((state) => state.favouriteMovies);

// useEffect(()=> {

// }, [favouriteMovies])

  console.log("array of watch later", movies);

  // useEffect(() => {
  //   const arrX = fetchPopularMovies();
  //   setArr(arrX);
  // }, [arr]);

  return (
    <>
      <div className="max-w-screen-lg m-auto">
        <h2 className="text-white text-4xl pt-20 pb-6">My list</h2>
        <div className="flex flex-col gap-3">
          {movies.length ? (
            movies.map((item) => <AccountMovie movie={item} />)
          ) : (
            <p className="text-white">No movies here yet...</p>
          )}
        </div>
        {/* {movies.map(item => (
          <div>
            <img src={`${item.payload.img}`} alt="" />
          </div>
        ),} */}
      </div>
      <div className="max-w-screen-lg m-auto mt-10">
        <h2 className="text-white text-4xl py-6 flex">
          My favourites <StarRating />
        </h2>
        <div className="flex flex-col gap-3">
          {favouriteMovies.length ? (
            favouriteMovies.map((item) => <AccountMovie movie={item} />)
          ) : (
            <p className="text-white">No movies here yet...</p>
          )}
        </div>
        {/* <div>
          {arr.map(item => (
          <Movie movie={item} />
        ))}
        </div> */}
        {/* <div>
          <UsersList />
        </div> */}
        {/* <SavedShows /> */}
        
      </div>
    </>
  );
};

export default Account;
