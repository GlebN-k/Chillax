import React from "react";

import FacebookIcon from "../Atoms/FacebookIcon"
import Twitter from "../Atoms/TwitterIcon"
import InstagramIcon from "../Atoms/InstagramIcon"
import Logo from "../Atoms/Logo"

const Footer = () => {
  return (
    <footer className="text-white py-[100px]" id="footer">
      <div className="flex flex-col ml-auto mr-auto max-w-3xl relative">
        <div className="flex justify-between mb-[50px]">
          <Logo />
          {/* <a href="#">
            <img
              class="footer__logo-icon"
              src="./assets/Logo.png"
              alt="logo icon"
            />
          </a> */}
          <div className="flex justify-between w-[150px]">
            <FacebookIcon />
            <Twitter />
            <InstagramIcon />
          </div>
        </div>
        <div>
          Copyrights © 2023 Chillax Group | Made without tears
        </div>
      </div>
    </footer>
  );
};

export default Footer;
