import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxMagnifyingGlass } from "react-icons/rx";
import { useDispatch } from "react-redux";

import { clearAllFavourites } from "../../features/favouriteMovies/favouriteMovies";
import { UserAuth } from "../../context/AuthContext";
import Logo from "../Atoms/Logo";
import InputSearch from "../Atoms/InputSearch";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const [loupe, setLoupe] = useState(false);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await logOut();
      dispatch(clearAllFavourites());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChosenMovieClick = () => {
    setLoupe(false);
  };

  return (
    <div className="w-full absolute z-30 text-white flex p-4 justify-between items-center">
      <div className="flex flex-col md:flex-row gap-3">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex gap-4 relative">
          {/* <div className="absolute top-4 left-[150px] flex gap-4"> */}

          {/* <GiHamburgerMenu
          className="text-white cursor-pointer "
          onClick={() => setIsSideBar(!isSideBar)}
        /> */}

          <RxMagnifyingGlass
            className="absolute top-[7px] cursor-pointer h-[25px] w-[25px]"
            onClick={() => setLoupe(!loupe)}
          />
          {loupe && <InputSearch onClick={handleChosenMovieClick} />}
        </div>
      </div>

      {user?.email ? (
        <div>
          <Link to="/account">
            <button className="mr-4 font-bold py-1 px-3 bg-black rounded bg-opacity-20 ">Account</button>
          </Link>

          <button className="bg-amber-400 py-1 px-3 rounded font-bold" onClick={handleLogOut}>
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="mr-4 font-bold py-1 px-3 bg-black rounded bg-opacity-20 ">
              Sign in
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-amber-400 py-1 px-3 rounded font-bold">
              Sign up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
