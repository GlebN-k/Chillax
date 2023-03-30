import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxMagnifyingGlass } from "react-icons/rx";
// import { Switch } from "@material-tailwind/react";
// import ControlledSwitches from "../Atoms/Switch";

import { UserAuth } from "../../Context/AuthContext";
import SideBar from "../Molecules/SideBar";
import Logo from "../Atoms/Logo";
import InputSearch from "../Atoms/InputSearch";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  // const [xxx, setXxx] = useState(true);
  const [loupe, setLoupe] = useState(false);
  const [isSideBar, setIsSideBar] = useState(false);

  console.log(user);

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setIsSideBar(false);
  };

  const handleChosenMovieClick = () => {
    setLoupe(false);
    // navigate(`/signup`)
    console.log("works");
  };

  // const handleWindowClick = () => {

  // }
  // useEffect(() => {
  //   window.addEventListener("click", ()=> {
  //     if(isSideBar) {setIsSideBar(false)}
  //     })
  // });

  return (
    <div className="w-full absolute z-30 text-white flex p-4 justify-between">
      <Link to="/">
        <Logo />
      </Link>
      <div className="absolute top-4 left-[150px] flex gap-4">
        
        <GiHamburgerMenu
          className="text-white cursor-pointer "
          onClick={() => setIsSideBar(!isSideBar)}
        />

        <RxMagnifyingGlass
          className="cursor-pointer"
          onClick={() => setLoupe(!loupe)}
        />
        {loupe && <InputSearch onClick={handleChosenMovieClick} />}
      </div>

      {isSideBar && <SideBar onClick={handleClick} />}
      {user?.email ? (
        <div>
          <Link to="/account">
            <button className="mr-4">Account</button>
          </Link>

          <button className="bg-amber-400 p-3" onClick={handleLogOut}>Sign out</button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="mr-4 font-bold py-1 px-3 bg-black rounded bg-opacity-20 ">Sign in</button>
          </Link>
          <Link to="/signup">
            <button className="bg-amber-400 py-1 px-3 rounded font-bold">Sign up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
