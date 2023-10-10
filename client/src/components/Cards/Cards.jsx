import React, { useEffect } from "react";
import Card from "../Card/Card";
import Searchbar from "../Searchbar/Searchbar";
import { useSelector, useDispatch } from "react-redux";
import {
  orderCardsByRating,
  filterCardsByGenre,
  filterCardsBySource,
  orderCardsByName,
} from "../../redux/actions";

export default function Cards(props) {
  const { onSearchByName } = props;
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.allVideogames);

  const videogamesList = allVideogames.map((videogame) => (
    <Card
      key={videogame.id}
      id={videogame.id}
      name={videogame.name}
      image={videogame.background_image}
      genres={videogame.genres}
    />
  ));

  const handleOrderByName = (e) => {
    dispatch(orderCardsByName(e.target.value));
  };

  return (
    <div>
      <Searchbar onSearchByName={onSearchByName} />
      <div>
        <select onChange={handleOrderByName}>
          <option value="A">Sort by name: A to Z</option>
          <option value="Z">Sort by name: Z to A</option>
        </select>
      </div>
      <div>{videogamesList}</div>
    </div>
  );
}
