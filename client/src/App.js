import "./App.css";
import React from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import Nav from "./components/Nav/Nav";
import Cards from "./components/Cards/Cards";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

function App() {
  const [videogames, setVideogames] = React.useState([]);
  const [initialLoad, setInitialLoad] = React.useState(true);
  const [genres, setGenres] = React.useState([]);
  const [platforms, setPlatforms] = React.useState([]);

  const onSearchByName = async (name) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/videogames/name?name=${name}`
      );
      setVideogames(data);
      setInitialLoad(false);
    } catch (error) {
      window.alert("No hay videojuegos con este nombre");
    }
  };

  const onSearchAll = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/videogames`);
      setVideogames(data);
      setInitialLoad(false);
    } catch (error) {
      window.alert("No hay videojuegos");
    }
  };

  const location = useLocation();

  React.useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axios.get(
          "http://localhost:3001/videogames/genres"
        );
        setGenres(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchGenres();
  }, []);

  React.useEffect(() => {
    async function fetchPlatforms() {
      try {
        const response = await axios.get(
          "http://localhost:3001/videogames/platforms"
        );
        setPlatforms(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPlatforms();
  }, []);

  React.useEffect(() => {
    if (initialLoad) {
      onSearchAll();
    }
  }, [initialLoad, onSearchAll]);

  return (
    <div className="App">
      {location.pathname !== "/" ? <Nav /> : null}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <Cards
              videogames={videogames}
              onSearchAll={onSearchAll}
              onSearchByName={onSearchByName}
              initialLoad={initialLoad}
            />
          }
        />
        <Route
          path="/form"
          element={<Form genres={genres} platforms={platforms} />}
        />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
