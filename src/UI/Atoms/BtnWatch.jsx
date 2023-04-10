import React from "react";
import {BsPlayCircle} from "react-icons/bs"

const BtnWatch = ({onClick}) => {
  return (
    <button className="rounded bg-yellow-300 text-black px-3 py-1 hover:bg-amber-500 hover:text-white flex items-center gap-2" onClick={onClick}>
      <BsPlayCircle className="w-[30px] h-[25px] m-auto"/>
      <span className="hover:text-white">Watch</span>
    </button>
  );
};

export default BtnWatch;
