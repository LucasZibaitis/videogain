import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <div>
      <Link to={`/detail/${props.id}`}>
        <div>
          <h1>Name: {props.name}</h1>
          <h1>Genre: {props.genres}</h1>
          <img src={props.image} height={200} />
        </div>
      </Link>
    </div>
  );
}
