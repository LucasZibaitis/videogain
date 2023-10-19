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
          <h2 className={styles.cardName}>{props.name}</h2>
          <h3>{genreName}</h3>
          {/* <img src={props.image} height={100} className={styles.cardImage} /> */}
        </div>
      </Link>
    </div>
  );
}
