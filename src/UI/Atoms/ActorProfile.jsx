import React from "react";

const ActorProfile = ({ actor }) => {
  return (
    <div className="flex flex-col w-[80px] justify-center items-center px-1 first:pl-0">
      <img
        className="w-[70px] h-[70px] object-cover    rounded-full"
        src={`https://image.tmdb.org/t/p/original${actor?.profile_path}`}
        alt={`${actor?.name}`}
      />
      <p className="text-center text-xs">{actor.name}</p>
    </div>
  );
};

export default ActorProfile;
