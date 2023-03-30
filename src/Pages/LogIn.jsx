import React, { useState, useContext, useEffect } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
// import { fetchMovies } from "../features/favouriteMovies/favouriteMovies";


// import { useDispatch } from "react-redux";
import LogPhoto from "./LogPhoto";

const LogIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)
  const { user, logIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // const dispatch = useDispatch();

  // const fetchMovies = createAsyncThunk("favouriteMovies/fetchMovies", async() => {
  //       onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
  //           return doc.data().savedShows
  //       })
  //   })


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      setError(true)
      console.log(error);
    }
  };

  // useEffect(() => {
  //   // При кожній зміні user, ми будемо виконувати запит до Firestore.
  //   if (user) {
  //     dispatch(fetchMovies());
  //   }
  // }, [user]);

  return (
    <div className="h-[100vh] flex justify-center items-center">
      {/* <img className="w-[100vw] h-[100vh]" src={'./dribblshot.png'} alt="nothing" /> */}
      <LogPhoto />
      <div className="absolute flex h-[350px] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-500 bg-opacity-50 rounded-xl  ">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                {/* <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a> */}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
          {error && <div className="text-red-600 bg-zinc-500">"You entered wrong email or password"</div>}
        </div>
      </div>
    </div>
  );
};

export default LogIn;
