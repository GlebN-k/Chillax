import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies } from '../../features/getPopularMoviesAPI/getPopuparMoviesSlice';
// import { getPopularMoviesStart, getPopularMoviesSuccess, getPopularMoviesFailure } from '../../features/getPopularMoviesAPI/getPopuparMoviesSlice';

const UsersList = () => {
  const movies = useSelector(state => state.getPopularMovies.movies);
  const isLoading = useSelector(state => state.getPopularMovies.isLoading);
  const error = useSelector(state => state.getPopularMovies.error);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul className='text-white'>
      {movies.map(movie => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
};

export default UsersList;
