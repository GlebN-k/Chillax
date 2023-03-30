import React from "react";

const BtnWatch = ({onClick}) => {
  return (
    <button className="h-[30px] w-[100px] rounded bg-yellow-300 text-black px-5 py-1 hover:bg-amber-500 hover:text-white" onClick={onClick}>
      Watch
    </button>
  );
};

export default BtnWatch;
