import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { fetchTopMovies } from "../../features/topMoviesSlice/getTopMoviesThunk";
import { fetchPopularMovies } from "../../features/getPopularMoviesAPI/getPopuparMoviesSlice";
import { fetchTrendingMovies } from "../../features/trendingMovies/getTrendingMoviesThunk";
import { fetchUpComingMovies } from "../../features/upComingMovies/getUpComingMoviesThunk";

const Pagination = ({ total_pages }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const handleClick = (page = 1) => {
    setCurrentPage(page);
    dispatch(fetchTopMovies(page));
    dispatch(fetchPopularMovies(page));
    dispatch(fetchTrendingMovies(page));
    dispatch(fetchUpComingMovies(page))
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    const showPages = (from, to) => {
      for (let i = from; i <= to; i++) {
        pageNumbers.push(i);
      }
    };

    if (currentPage <= 3) {
      showPages(1, Math.min(5, total_pages));
      if (total_pages > 5) {
        pageNumbers.push("...");
        pageNumbers.push(total_pages);
      }
    } else if (currentPage >= total_pages - 2) {
      pageNumbers.push(1);
      pageNumbers.push("...");
      showPages(Math.max(total_pages - 4, 1), total_pages);
    } else {
      pageNumbers.push(1);
      if (currentPage > 4) {
        pageNumbers.push("...");
      }
      showPages(currentPage - 2, currentPage + 2);
      if (currentPage < total_pages - 3) {
        pageNumbers.push("...");
      }
      pageNumbers.push(total_pages);
    }

    return pageNumbers.map((page, index) => (
      <button
        key={index}
        className={`mx-1 px-3 py-1 rounded-full text-white ${
          page === currentPage ? "bg-gray-800 " : ""
        }`}
        onClick={() => handleClick(page)}
      >
        {page}
      </button>
    ));
  };

  return <div className="flex justify-center my-4">{renderPageNumbers()}</div>;
};

export default Pagination;


// import React, {useState} from 'react'
// import { useDispatch } from 'react-redux';

// import { fetchTopMovies } from '../../features/topMoviesSlice/getTopMoviesThunk';

// const Pagination = ({total_pages}) => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const dispatch = useDispatch();
  
//     const handleClick = (page = 1) => {
//       setCurrentPage(page)
//       dispatch(fetchTopMovies(page))
//     }
  
//     const renderPageNumbers = () => {
//       const pageNumbers = [];
  
//       // Add first five pages
//       for (let i = 1; i <= 5 && i <= total_pages; i++) {
//         pageNumbers.push(i);
//       }
  
//       // Add ellipsis if there are more than five pages
//       if (total_pages > 5) {
//         pageNumbers.push('...');
//       }
  
//       // Add last page
//       if (total_pages > 1) {
//         pageNumbers.push(total_pages);
//       }
  
//       return pageNumbers.map((page, index) => (
//         <button
//           key={index}
//           className={`mx-1 px-3 py-1 rounded-full text-white ${
//             page === currentPage ? "bg-gray-800 " : ""
//           }`}
//           onClick={() => handleClick(page)}
//         >
//           {page}
//         </button>
//       ));
//     }
  
//     return (
//       <div className="flex justify-center my-4">
//         {renderPageNumbers()}
//       </div>
//     );
//   };
  
//   export default Pagination

// import React, {useState} from 'react'
// import { useDispatch } from 'react-redux';

// import { fetchTopMovies } from '../../features/topMoviesSlice/getTopMoviesThunk';

// const Pagination = ({total_pages}) => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const dispatch = useDispatch();
//     // Set number of movies to show per page
//     // const moviesPerPage = 10;
//     // Get total number of movies
//     // const totalMovies = movies.movies.length;
//     // Calculate total number of pages
//     // const totalPages = Math.ceil(totalMovies / moviesPerPage);
  
//     // Calculate index of last movie to show on current page
//     // const lastIndex = currentPage * moviesPerPage;
//     // Calculate index of first movie to show on current page
//     // const firstIndex = lastIndex - moviesPerPage;
//     // Get array of movies to show on current page
//     // const currentMovies = movies.movies.slice(firstIndex, lastIndex);

//     const handleClick = (page = 1) => {
//         setCurrentPage(page)
//         dispatch(fetchTopMovies(page))
//     }
  
//     return (
//     <div className="flex justify-center my-4">
//         {Array.from({ length: total_pages }, (_, i) => i + 1).map((page) => (
//           <button
//             key={page}
//             className={`mx-1 px-3 py-1 rounded-full text-white ${
//               page === currentPage ? "bg-gray-800 " : ""
//             }`}
//             onClick={() => handleClick(page)}
//           >
//             {page}
//           </button>
//         ))}
//       </div>
//   )
// }

// export default Pagination