import React, { useEffect } from "react";
import Card from "../Card/Card";
import Searchbar from "../Searchbar/Searchbar";

export default function Cards(props) {
  const { onSearch, videogames, initialLoad } = props;

  useEffect(() => {
    if (initialLoad) {
      onSearch("");
    }
  }, [initialLoad, onSearch]);

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
      <Searchbar onSearch={props.onSearch} />
      <div>{videogamesList}</div>
    </div>
  );
}
