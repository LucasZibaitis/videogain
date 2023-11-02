import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Detail.module.css";

export default function Detail() {
  const uuidv4Pattern =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
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
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

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

  async function deleteVideogame() {
    try {
      await axios.delete(
        `https://pi-videogames-back-a5zj.onrender.com/videogames/videogame/${id}`
      );
      window.alert("Videogame deleted");
    } catch (error) {
      window.alert("Videogame could not be deleted");
    }
  }

  return (
    <div className={styles.pageContainer}>
      {deleteConfirmation ? (
        <div className={styles.deleteContainer}>
          <h1 className={styles.question}>
            Are you sure you want to delete this videogame?
          </h1>
          <div className={styles.responseContainer}>
            <div
              className={styles.responseYes}
              onClick={() => {
                deleteVideogame();
              }}
            >
              <h2 className={styles.response}>Yes</h2>
            </div>
            <div
              className={styles.responseNo}
              onClick={() => {
                setDeleteConfirmation(false);
              }}
            >
              <h2 className={styles.response}>No</h2>
            </div>
          </div>
        </div>
      ) : videogame.name ? (
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
              {uuidv4Pattern.test(videogame.id) ? (
                <div
                  className={styles.deleteDiv}
                  onClick={() => {
                    setDeleteConfirmation(true);
                  }}
                >
                  <h2 className={styles.deleteH2}>Delete from database</h2>
                </div>
              ) : null}
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
