import "./App.css";
import { Route, Routes } from "react-router-dom";

import Navbar from "./UI/Organisms/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Account from "./pages/Account";
import ProtectedRoute from "./context/ProtectedRoute";
import ChosenMovie from "./pages/ChosenMovie";
import Footer from "./UI/Organisms/Footer";
import MoviesPage from "./pages/MoviesPage";
import SearchResults from "./pages/SearchResults";
import FiltersPage from "./pages/FiltersPage";

function App() {

  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:title" element={<MoviesPage />} />
          <Route path="/:type/:id" element={<ChosenMovie />} />
          <Route />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/searchResults/:value" element={<SearchResults />}/>
          <Route path="filters" element={<FiltersPage />} />

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
