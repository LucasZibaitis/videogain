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

    // Llama a la función asincrónica
    fetchVideogame();
  }, [id]);
  return (
    <div>
      <div>
        <h1>{videogame.id}</h1>
        <h1>{videogame.name}</h1>
        <h3>{videogame.description}</h3>
        <img src={videogame.image} />
        <ul>
          {videogame.platforms.map((platform) => (
            <li key={platform.platform.id}>{platform.platform.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
