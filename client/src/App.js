import "./App.css";
import React from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import Nav from "./components/Nav/Nav";
import Cards from "./components/Cards/Cards";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllGenres,
  setAllPlatforms,
  setAllVideogames,
} from "./redux/actions";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const filteredVideogames = useSelector((state) => state.filteredVideogames);

  const fetchVideogames = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/videogames`);
      dispatch(setAllVideogames(data));
    } catch (error) {}
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/videogames/genres"
      );
      dispatch(setAllGenres(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlatforms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/videogames/platforms"
      );
      dispatch(setAllPlatforms(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchVideogames();
    fetchGenres();
    fetchPlatforms();
  }, []);

  return (
    <div className="App">
      {location.pathname !== "/" ? <Nav /> : null}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={<Cards fetchVideogames={fetchVideogames} />}
        />
        <Route path="/form" element={<Form />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
