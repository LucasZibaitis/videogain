import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  const genreName =
    Array.isArray(props.genres) && props.genres.length > 0
      ? props.genres[0].name
      : "Genreless";

  return (
    <div class=" border-4 border-white rounded-lg flex flex-col h-96 overflow-hidden hover:shadow-2xl transition-all duration-200">
      <Link to={`/detail/${props.id}`}>
        <div class="h-full">
          <div class="bg-[#3c4999] min-h-28 px-2 text-white text-3xl pl-2 py-2 flex items-start justify-start">
            <h1>{props.name}</h1>
          </div>
          <div class="relative flex items-center bg-[#808080] h-10 lowercase italic text-2xl font-light pl-2 rounded-b-xl border-4 -ml-1 -mr-1 border-white">
            <h2>{genreName}</h2>
          </div>
          <img src={props.image} class="h-full w-full object-cover -mt-1" />
        </div>
      </Link>
    </div>
  );
}
