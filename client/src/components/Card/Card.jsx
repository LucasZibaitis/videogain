import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card(props) {
  const genreName =
    Array.isArray(props.genres) && props.genres.length > 0
      ? props.genres[0].name
      : "Genreless";

  return (
    <div>
      <Link to={`/detail/${props.id}`} className={styles.cardLink}>
        <div className={styles.card}>
          <div className={styles.cardNameContainer}>
            <h1 className={styles.cardName}>{props.name}</h1>
          </div>
          <div className={styles.cardGenreContainer}>
            <h2 className={styles.cardGenre}>{genreName}</h2>
          </div>
          <div className={styles.cardImageContainer}>
            <img src={props.image} className={styles.cardImage} />
          </div>
        </div>
      </Link>
    </div>
  );
}
