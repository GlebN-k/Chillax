import React from "react";

const BtnDetails = () => {

   const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
   
  return (
    <button className=" text-white px-5 py-1  border-2 hover:bg-white hover:text-black rounded" onClick={handleClick}>
      Details
    </button>
  );
};

export default BtnDetails;
