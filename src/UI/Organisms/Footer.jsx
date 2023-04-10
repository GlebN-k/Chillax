import React from "react";

import FacebookIcon from "../Atoms/FacebookIcon"
import Twitter from "../Atoms/TwitterIcon"
import InstagramIcon from "../Atoms/InstagramIcon"
import Logo from "../Atoms/Logo"
import { Link } from "react-router-dom";

const Footer = () => {
  const handleClick =() => {
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  }

  return (
    <footer className="text-white py-[100px] px-5" id="footer">
      <div className="flex flex-col ml-auto mr-auto max-w-3xl relative">
        <div className="flex justify-between mb-[50px]">
        <Link to="/">
          <Logo onClick={() => handleClick()}/>
        </Link>
          <div className="flex justify-between w-[150px]">
            <FacebookIcon />
            <Twitter />
            <InstagramIcon />
          </div>
        </div>
        <div className="text-center">
          Copyrights © 2023  <br></br> Chillax Group | Made without tears
        </div>
      </div>
    </footer>
  );
};

export default Footer;
