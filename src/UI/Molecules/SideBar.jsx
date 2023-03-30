import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiMovie2Line } from "react-icons/ri";
import { BsBook } from "react-icons/bs";
import { FiMusic } from "react-icons/fi";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { SlGameController } from "react-icons/sl";

const SideBar = ({ onClick }) => {
  const [isSideBar, setIsSideBar] = useState(true);

  //   useEffect(() => {
  //     window.addEventListener("click", ()=> {setIsSideBar(false)})
  //   });

  return (
    <aside className="h-[100vh] w-[10%] py-40 absolute top-0 left-0 bg-black opacity-90 flex flex-col items-center gap-20">
      <span>
        <RiMovie2Line />
      </span>
      <span>
        <Link to="/music">
          <FiMusic onClick={onClick} className="text-red-600 " />
        </Link>
      </span>
      <span>
        <BsBook />
      </span>
      <div className="text-white">
        <SlGameController />
      </div>
      <div className="absolute bottom-20 cursor-pointer" onClick={onClick}>
        <FaLongArrowAltLeft />
      </div>
    </aside>
  );
};

export default SideBar;
