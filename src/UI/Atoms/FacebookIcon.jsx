import React, { useState } from "react";

const FacebookIcon = () => {
const [fill, setFill] = useState("white");

const handleMouseOver = () => {
setFill("#fbbf24");
};

const handleMouseOut = () => {
setFill("white");
};

return (
<a
   className=""
   href="https://www.facebook.com/"
   title="Facebook"
   onMouseOver={handleMouseOver}
   onMouseOut={handleMouseOut}
   target="blank"
 >
<svg
     width="40"
     height="40"
     viewBox="0 0 40 40"
     fill="none"
     xmlns="http://www.w3.org/2000/svg"
   >
<path
       className="hover:fill-amber-400"
       d="M23.7188 21L24.1562 18.125H21.375V16.25C21.375 15.4375 21.75 14.6875 23 14.6875H24.2812V12.2188C24.2812 12.2188 23.125 12 22.0312 12C19.75 12 18.25 13.4062 18.25 15.9062V18.125H15.6875V21H18.25V28H21.375V21H23.7188Z"
       fill={fill}
     />
<circle opacity="0.4" cx="20" cy="20" r="19.5" stroke={fill} />
</svg>
</a>
);
};

export default FacebookIcon;