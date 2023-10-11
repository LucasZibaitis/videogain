import React, { useEffect } from "react";
import Card from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import {
  orderCardsByRating,
  filterCardsByGenre,
  filterCardsBySource,
  orderCardsByName,
  setVideogamesByName,
} from "../../redux/actions";

export default function Cards(props) {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.allVideogames);
  const allGenres = useSelector((state) => state.allGenres);
  const [name, setName] = React.useState("");
  const { fetchVideogames } = props;
  const [nameOrder, setNameOrder] = React.useState("none");
  const [ratingOrder, setRatingOrder] = React.useState("none");
  const [genreFilter, setGenreFilter] = React.useState("all");

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
    const selectedOrder = e.target.value;
    dispatch(orderCardsByName(selectedOrder));
    setNameOrder(selectedOrder);
    setRatingOrder("none");
  };

  const handleOrderByRating = (e) => {
    const selectedOrder = e.target.value;
    dispatch(orderCardsByRating(selectedOrder));
    setRatingOrder(selectedOrder);
    setNameOrder("none");
  };

  const handleSearch = () => {
    dispatch(setVideogamesByName(name));
    setNameOrder("none");
    setRatingOrder("none");
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleRefresh = () => {
    setNameOrder("none");
    setRatingOrder("none");
    setName("");
    setGenreFilter("all");
    fetchVideogames();
  };

  const genresFilter = allGenres.map((genre) => (
    <option value={genre.name}>{genre.name}</option>
  ));

  const handleFilterByGenre = (e) => {
    const selectedFilter = e.target.value;
    dispatch(filterCardsByGenre(selectedFilter));
    setGenreFilter(selectedFilter);
    setNameOrder("none");
    setRatingOrder("none");
  };

  return (
    <div>
      <div>
        <input type="text" onChange={handleChange} value={name} />
        <button onClick={handleSearch}>Search Videogame</button>
      </div>
      <div>
        <button onClick={handleRefresh}>Refresh Cards</button>
      </div>
      <div>
        <select onChange={handleOrderByName} value={nameOrder}>
          <option value="none">Sort by name: none</option>
          <option value="A">Sort by name: A to Z</option>
          <option value="Z">Sort by name: Z to A</option>
        </select>
      </div>
      <div>
        <select onChange={handleOrderByRating} value={ratingOrder}>
          <option value="none">Sort by rating: none</option>
          <option value="A">Sort by rating: Ascending</option>
          <option value="D">Sort by rating: Descending</option>
        </select>
      </div>
      <div>
        <select onChange={handleFilterByGenre} value={genreFilter}>
          <option value="all">Show all</option>
          {genresFilter}
        </select>
      </div>
      <div>{videogamesList}</div>
    </div>
  );
}
