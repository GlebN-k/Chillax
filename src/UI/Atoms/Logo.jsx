import React from "react";

const Logo = ({ onClick }) => {
  return (
    <div className=" text-amber-400 text-2xl font-extrabold" onClick={onClick}>
      Chillax
    </div>
  );
};

export default Logo;
