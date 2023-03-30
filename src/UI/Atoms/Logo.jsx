import React from "react";

const Logo = () => {
  return (
    <div className="w-[150px] h-[50px] ">
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect x="0" y="0" width="80%" height="30%" fill="#00000000" />
      <text
        x="40%"
        y="20%"
        font-size="20"
        text-anchor="middle"
        fill="#FFD700"
        font-family="Arial, Helvetica, sans-serif"
        font-weight="bold"
      >
        Chillax
      </text>
    </svg> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 50"
        width="150"
        height="50"
      >
        <rect x="0" y="0" width="100%" height="100%" fill="#00000000" />
        <text
          x="30%"
          y="50%"
          font-size="35"
          text-anchor="middle"
          fill="#FFD700"
          font-family="Arial, Helvetica, sans-serif"
          font-weight="bold"
        >
          Chillax
        </text>
      </svg>
    </div>
  );
};

export default Logo;
