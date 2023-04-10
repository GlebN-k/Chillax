import React from 'react'

const MovieGenre = ({genre}) => {
  return (
    <span className=" bg-amber-300 bg-opacity-40 text-white rounded-xl px-2 mx-3 first:ml-0 flex items-center ">
    {genre?.name}
  </span>
  )
}

export default MovieGenre