import "./App.css";
import { NavLink, Route, RouterProvider, Routes } from "react-router-dom";
import Navbar from "./UI/Organisms/Navbar";
import { AuthContextProvider } from "./Context/AuthContext";
import { useSelector } from "react-redux";

import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import Account from "./Pages/Account";
import ProtectedRoute from "./Context/ProtectedRoute";
import Music from "./Pages/Music";
import ChosenMovie from "./Pages/ChosenMovie";
import Footer from "./UI/Organisms/Footer";
import MoviesPage from "./Pages/MoviesPage";

function App() {
  // const {isSwitchedOn} = useSelector(state => state.toggle)
  // const themeColor = isSwitchedOn ? "white" : "black";
  // const textColor = isSwitchedOn ? "black" : "white";

  return (
    <div>
      {/* <div style={{backgroundColor: themeColor, color: textColor}}> */}
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/movies/:title" element={<MoviesPage />} />
            <Route path="/:id" element={<ChosenMovie />} />
          {/* <Route /> */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/music" element={<Music />} />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </div>
  );
}

export default App;
