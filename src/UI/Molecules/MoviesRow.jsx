import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setMovieId } from "../../features/chosenMovie/ChosenMovieSlice";
import Movie from "./Movie";

const MoviesRow = ({ title, onData, movies }) => {
  const dispatch = useDispatch();
  const favouriteMovies = useSelector((state) => state.favouriteMovies).map(
    (item) => item.id
  );
  const watchLaterMovies = useSelector((state) => state.watchLater).map(
    (item) => item.id
  );

  return (
    <>
      <div className="flex flex-col">
        <div className="text-white w-full h-full relative" id={"slider"}>
          {movies.map((movie) => {
            let like = false;
            let saved = false;
            if (favouriteMovies.includes(movie.id)) {
              like = true;
            }
            if (watchLaterMovies.includes(movie.id)) {
              saved = true;
            }

            return (
              <Link to={`/${movie.id}`}>
                <Movie
                  movie={movie}
                  favourite={like}
                  savedMovie={saved}
                  key={`${movie?.id}`}
                  onClick={() => dispatch(setMovieId(movie.id))}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MoviesRow;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { setMovieId } from "../../features/chosenMovie/ChosenMovieSlice";
// // import {FaHeart, FaRegHeart} from 'react-icons/fa'

// import Movie from "./Movie";

// const Row = ({ title, onData, movies }) => {
//   // const Row = ({ title, onData, fetchUrl }) => {
//   // const [movieArr, setMovieArr] = useState([]);

//   //   const key = "acf837ccca44b10855aa8ef467ec0211";

//   const dispatch = useDispatch();
//   const favouriteMovies = useSelector((state) => state.favouriteMovies).map(
//     (item) => item.id
//   );
//   const watchLaterMovies = useSelector(state => state.watchLater).map(item => item.id)

//   return (
//     <>
//       <Link to={`./${title}`} >
//       <h2 className="text-white">{title}</h2>
//       </Link>
//       <div className="flex">
//         <div
//           className="text-white w-full h-full whitespace-nowrap overflow-x-scroll scroll-smooth scrollbar-hide relative"
//           id={"slider"}
//         >
//           {movies.map((movie) => {
//             let like = false;
//             let saved = false;
//             if (favouriteMovies.includes(movie.id)) {
//               like = true;
//             }
//             if (watchLaterMovies.includes(movie.id)) {
//               saved = true;
//             }

//             return (
//               <Movie
//                 movie={movie}
//                 favourite={like}
//                 savedMovie={saved}
//                 key={`${movie?.id}`}
//                 onClick={() => dispatch(setMovieId(movie.id))}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Row;
