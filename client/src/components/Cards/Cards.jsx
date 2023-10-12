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
  const filteredVideogames = useSelector((state) => state.filteredVideogames);
  const allGenres = useSelector((state) => state.allGenres);
  const [name, setName] = React.useState("");
  const { fetchVideogames, initialLoad } = props;
  const [nameOrder, setNameOrder] = React.useState("none");
  const [ratingOrder, setRatingOrder] = React.useState("none");
  const [genreFilter, setGenreFilter] = React.useState("all");
  const [sourceFilter, setSourceFilter] = React.useState("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  const cardsPerPage = 15;
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = currentPage * cardsPerPage;
  const visibleVideogames = filteredVideogames.slice(startIndex, endIndex);

  const videogamesList = visibleVideogames.map((videogame) => (
    <Card
      key={videogame.id}
      id={videogame.id}
      name={videogame.name}
      image={videogame.background_image}
      genres={videogame.genres}
    />
  ));

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(filteredVideogames.length / cardsPerPage);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

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
    setSourceFilter("all");
    setCurrentPage(1);
    fetchVideogames();
  };

  const genresFilter = allGenres.map((genre) => (
    <option value={genre.name}>{genre.name}</option>
  ));

  const handleFilterByGenre = (e) => {
    const selectedFilter = e.target.value;
    dispatch(filterCardsByGenre(selectedFilter));
    setGenreFilter(selectedFilter);
    setSourceFilter("all");
  };

  const handleFilterBySource = (e) => {
    const selectedFilter = e.target.value;
    dispatch(filterCardsBySource(selectedFilter));
    setSourceFilter(selectedFilter);
    setGenreFilter("all");
  };

  return (
    <div>
      <div>
        <input type="text" onChange={handleChange} value={name} />
        <button onClick={handleSearch}>Search Videogame</button>
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
          <option value="all">Filter by genre</option>
          {genresFilter}
          <option value="Genreless">Genreless</option>
        </select>
      </div>
      <div>
        <select onChange={handleFilterBySource} value={sourceFilter}>
          <option value="all">Filter by source</option>
          <option value="api">API Videogames</option>
          <option value="db">Database Videogames</option>
        </select>
      </div>
      <div>
        <button onClick={handleRefresh}>Refresh Cards</button>
      </div>
      <div>
        <button onClick={handlePreviousPage}>Previous Page</button>
        <span> Page {currentPage} </span>
        <button onClick={handleNextPage}>Next Page</button>
      </div>

      <div>{videogamesList}</div>
    </div>
  );
}
