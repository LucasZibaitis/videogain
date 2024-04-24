import React, { useEffect, useState } from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import Nav from "./components/Nav/Nav";
import Cards from "./components/Cards/Cards";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import { Routes, Route, useLocation } from "react-router-dom";
import axios, { all } from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllGenres,
  setAllPlatforms,
  setAllVideogames,
  setIsLoading,
} from "./redux/actions";
import "./index.css";

const URL = process.env.REACT_APP_LOCAL_ENDPOINT;
// const URL = process.env.REACT_APP_DEPLOYED_ENDPOINT;

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchVideogames = async () => {
    try {
      const { data } = await axios.get(`${URL}/videogames`);
      dispatch(setAllVideogames(data));
      dispatch(setIsLoading(false));
    } catch (error) {}
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(`${URL}/videogames/genres`);
      dispatch(setAllGenres(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlatforms = async () => {
    try {
      const response = await axios.get(`${URL}/videogames/platforms`);
      dispatch(setAllPlatforms(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVideogames();
    fetchPlatforms();
    fetchGenres();
  }, []);

  return (
    <main class="h-screen mx-36 mt-10">
      {location.pathname !== "/" ? <Nav /> : null}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={<Cards fetchVideogames={fetchVideogames} />}
        />
        {/* <Route
          path="/form"
          element={<Form fetchVideogames={fetchVideogames} />}
        /> */}
        <Route
          path="/detail/:id"
          element={<Detail fetchVideogames={fetchVideogames} />}
        />
      </Routes>
    </main>
  );
}

export default App;
