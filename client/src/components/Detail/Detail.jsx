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
          `https://pi-videogames-back-a5zj.onrender.com/videogames/videogame/${id}`
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
      <ul className={styles.othersInfo}>
        {videogame.genres.map((genre, index) => (
          <li key={index}>{genre.name}</li>
        ))}
      </ul>
    );
  }

  function renderPlatforms() {
    return (
      <ul className={styles.othersInfo}>
        {videogame.platforms.map((platform) => (
          <li>{platform.platform.name}</li>
        ))}
      </ul>
    );
  }

  function createMarkup(text) {
    return { __html: text };
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  }

  return (
    <div className={styles.pageContainer}>
      {videogame.name ? (
        <div className={styles.detailContainer}>
          <div>
            <div className={styles.card}>
              <div className={styles.cardImageContainer}>
                <img
                  src={videogame.background_image}
                  className={styles.cardImage}
                  alt=""
                />
              </div>
            </div>
            <div className={styles.idContainer}>
              <h2>ID: {videogame.id}</h2>
            </div>
          </div>
          <div className={styles.infoContainer}>
            <h1 className={styles.name}>{videogame.name}</h1>
            <h2 className={styles.descriptionTitle}>Description</h2>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={createMarkup(videogame.description)}
            />
            <div className={styles.others}>
              <div className={styles.othersGroup}>
                <h2 className={styles.othersTitle}>Release Date</h2>
                <div className={styles.othersInfo}>
                  {formatDate(videogame.released)}
                </div>
              </div>
              <div className={styles.othersGroup}>
                <h2 className={styles.othersTitle}>Rating</h2>
                <div className={styles.othersInfo}>{videogame.rating}</div>
              </div>
              <div className={styles.othersGroup}>
                <h2 className={styles.othersTitle}>Genres</h2>
                {renderGenres()}
              </div>
              <div className={styles.othersGroup}>
                <h2 className={styles.othersTitle}>Platforms</h2>
                {renderPlatforms()}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.detailContainer}>
          <div className={styles.loadingDiv}>
            <h1 className={styles.loadingH1}>loading videogame...</h1>
          </div>
        </div>
      )}
    </div>
  );
}
