import React from "react";
import { useSelector } from "react-redux";

import StarRating from "../UI/Atoms/StarRating";
import AccountMovie from "../UI/Molecules/AccountMovie";
import LogBackground from "./LogBackground";

const Account = () => {
  const movies = useSelector((state) => state.watchLater);
  const favouriteMovies = useSelector((state) => state.favouriteMovies);

  return (
    <>
    <div className="absolute -z-10 right-0">
      <LogBackground />
    </div>
      <div className="max-w-screen-lg m-auto px-2">
        <h2 className="text-white text-2xl md:text-4xl pt-24 pb-3">
          My saved movies
        </h2>
        <div className="flex flex-col gap-3">
          {movies.length ? (
            movies.map((item, index) => (
              <AccountMovie section="saved" movie={item} key={index} />
            ))
          ) : (
            <p className="text-white">No movies here yet...</p>
          )}
        </div>
      </div>
      <div className="max-w-screen-lg m-auto mt-10 px-2">
        <h2 className="text-white text-4xl py-6 flex">
          My favourites <StarRating />
        </h2>
        <div className="flex flex-col gap-3">
          {favouriteMovies.length ? (
            favouriteMovies.map((item, index) => (
              <AccountMovie section="favourites" movie={item} key={index} />
            ))
          ) : (
            <p className="text-white">No movies here yet...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
