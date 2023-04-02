import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setMovieId } from "../../features/chosenMovie/ChosenMovieSlice";
import Movie from "./Movie";

const Row = ({ title, onData, movies }) => {
  const dispatch = useDispatch();
  const favouriteMovies = useSelector((state) => state.favouriteMovies).map(
    (item) => item.id
  );
  const watchLaterMovies = useSelector(state => state.watchLater).map(item => item.id)

  const handleClick =() => {
    window.scrollTo({
      top:0
    })
  }

  return (
    <>
      <Link to={`./movies/${title}`} className="text-white relative flex items-center hover:text-amber-500 pb-1">
        <h2 className="mr-2 mt-2 pl-5" onClick={() => handleClick()}>{title}</h2>
        <span className="inline-block w-3 h-3 border-t border-r border-white transform rotate-45 transition duration-300 ease-in-out opacity-0 hover:opacity-100"></span>
      </Link>
      <div className="flex">
        <div
          className="text-white w-full h-full whitespace-nowrap overflow-x-scroll scroll-smooth scrollbar-hide relative"
          id={"slider"}
        >
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
              <Movie
                movie={movie}
                favourite={like}
                savedMovie={saved}
                key={`${movie?.id}`}
                onClick={() => dispatch(setMovieId(movie.id))}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Row;


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
