import React, { useEffect } from "react";
import Card from "../Card/Card";
import Searchbar from "../Searchbar/Searchbar";

export default function Cards(props) {
  const { videogames, onSearchByName } = props;

  const videogamesList = videogames.map((videogame) => (
    <Card
      key={videogame.id}
      id={videogame.id}
      name={videogame.name}
      image={videogame.background_image}
      genres={
        videogame.genres.length > 0 ? videogame.genres[0].name : "Genreless"
      }
    />
  ));

  return (
    <div>
      <Searchbar onSearchByName={onSearchByName} />
      <div>{videogamesList}</div>
    </div>
  );
}
