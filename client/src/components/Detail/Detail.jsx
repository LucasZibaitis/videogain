import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Detail() {
  const { id } = useParams();
  const [videogame, setVideogame] = useState({});

  useEffect(() => {
    async function fetchVideogame() {
      try {
        const response = await axios.get(
          `http://localhost:3001/videogames/videogame/${id}`
        );
        const data = response.data;
        setVideogame(data);
      } catch (error) {
        window.alert("No hay personajes con este ID");
      }
    }
    fetchVideogame();
  }, [id]);
  return (
    <div>
      {videogame ? (
        <div>
          <h1>{videogame.id}</h1>
          <h1>{videogame.name}</h1>
          <h3>{videogame.description}</h3>
          <img src={videogame.background_image} alt="" height={500} />
          <h3>Released: {videogame.released}</h3>
          <h3>{videogame.rating}</h3>
          <ul>
            {videogame.genres ? (
              videogame.genres.length > 0 ? (
                <h3>Genre: {videogame.genres[0].name}</h3>
              ) : (
                <li>No genres available</li>
              )
            ) : (
              <li>Loading genres...</li>
            )}
          </ul>

          <ul>
            {videogame.platforms ? (
              videogame.platforms.map((platform) => (
                <li key={platform.platform.id}>{platform.platform.name}</li>
              ))
            ) : (
              <li>Loading platforms...</li>
            )}
          </ul>
        </div>
      ) : (
        <p>Loading videogame...</p>
      )}
    </div>
  );
}
