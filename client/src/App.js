import "./App.css";
import React from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import Nav from "./components/Nav/Nav";
import Cards from "./components/Cards/Cards";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

function App() {
  const [videogames, setVideogames] = React.useState([]);
  const [initialLoad, setInitialLoad] = React.useState(true);

  const onSearch = async (name) => {
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

  const location = useLocation();

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
              onSearch={onSearch}
              initialLoad={initialLoad}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
