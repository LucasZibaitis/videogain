import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Detail() {
  const { id } = useParams();
  const [videogame, setVideogame] = useState({
    id: id,
    name: "",
    description: "",
    background_image: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    async function fetchVideogame() {
      try {
        const response = await axios.get(
          `http://localhost:3001/videogames/videogame/${id}`
        );
        const data = response.data;
        const {
          name,
          description,
          background_image,
          released,
          rating,
          genres,
          platforms,
        } = data;

        setVideogame({
          id,
          name,
          description,
          background_image,
          released,
          rating,
          genres,
          platforms,
        });
      } catch (error) {
        window.alert("No hay personajes con este ID");
      }
    }
    fetchVideogame();
  }, [id]);

  function renderGenres() {
    return (
      <ul>
        {videogame.genres.map((genre, index) => (
          <li key={index}>{genre.name}</li>
        ))}
      </ul>
    );
  }

  function renderPlatforms() {
    return (
      <ul>
        {videogame.platforms.map((platform) => (
          <li>{platform.platform.name}</li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      {videogame ? (
        <div>
          <h1>ID: {videogame.id}</h1>
          <h1>{videogame.name}</h1>
          <h3>{videogame.description}</h3>
          <img src={videogame.background_image} alt="" height={500} />
          <h3>Released: {videogame.released}</h3>
          <h3>Rating: {videogame.rating}</h3>
          <h3>Genres: {renderGenres()}</h3>
          <h3>Platforms: {renderPlatforms()}</h3>
        </div>
      ) : (
        <p>Loading videogame...</p>
      )}
    </div>
  );
}
