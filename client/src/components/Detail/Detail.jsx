import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Detail.module.css";

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

  function createMarkup(text) {
    return { __html: text };
  }

  return (
    <div className={styles.pageContainer}>
      {videogame ? (
        <div className={styles.detailContainer}>
          <div className={styles.card}>
            <div className={styles.cardNameContainer}>
              <h1 className={styles.cardName}>{videogame.name}</h1>
            </div>
            <div className={styles.cardGenreContainer}>
              {/* <h2 className={styles.cardGenre}>{renderGenres()}</h2> */}
            </div>
            <div className={styles.cardImageContainer}>
              <img
                src={videogame.background_image}
                className={styles.cardImage}
              />
            </div>
          </div>
          <div className={styles.infoContainer}>
            <h1>ID: {videogame.id}</h1>
            <h2>Description</h2>
            <div
              dangerouslySetInnerHTML={createMarkup(videogame.description)}
            />
            <h2>Release Date</h2>
            {videogame.released}
            <h2>Rating</h2>
            {videogame.rating}
            <h2>Genres</h2>
            {renderGenres()}
            <h2>Platforms</h2>
            {renderPlatforms()}
          </div>
        </div>
      ) : (
        <p>Loading videogame...</p>
      )}
    </div>
  );
}
