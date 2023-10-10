import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  const genreName =
    Array.isArray(props.genres) && props.genres.length > 0
      ? props.genres[0].name
      : "Genreless";

  return (
    <div>
      <Link to={`/detail/${props.id}`}>
        <div>
          <h1>Name: {props.name}</h1>
          <h1>Main Genre: {genreName}</h1>
          <img src={props.image} height={200} />
        </div>
      </Link>
    </div>
  );
}
