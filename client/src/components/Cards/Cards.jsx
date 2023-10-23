import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import {
  orderCardsByRating,
  filterCardsByGenre,
  filterCardsBySource,
  orderCardsByName,
  setVideogamesByName,
} from "../../redux/actions";
import Arrow from "./Arrow.png";
import styles from "./Cards.module.css";

export default function Cards(props) {
  const dispatch = useDispatch();
  const filteredVideogames = useSelector((state) => state.filteredVideogames);
  const allGenres = useSelector((state) => state.allGenres);
  const [name, setName] = useState("");
  const { fetchVideogames } = props;
  const [nameOrder, setNameOrder] = useState("none");
  const [ratingOrder, setRatingOrder] = useState("none");
  const [genreFilter, setGenreFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
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
    fetchVideogames();
    setNameOrder("none");
    setRatingOrder("none");
    setName("");
    setGenreFilter("all");
    setSourceFilter("all");
    setCurrentPage(1);
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
        <input
          type="text"
          onChange={handleChange}
          value={name}
          className={styles.searchInput}
        />
        <div className={styles.searchButtonFrame} onClick={handleSearch}>
          <p>search</p>
        </div>
      </div>
      <div className={styles.filterContainer}>
        <div>
          <select
            onChange={handleOrderByName}
            value={nameOrder}
            className={styles.selectorButton}
          >
            <option value="none">sort by name</option>
            <option value="A">sort by name: A to Z</option>
            <option value="Z">sort by name: Z to A</option>
          </select>
        </div>
        <div>
          <select
            onChange={handleOrderByRating}
            value={ratingOrder}
            className={styles.selectorButton}
          >
            <option value="none">sort by rating</option>
            <option value="A">sort by rating: Ascending</option>
            <option value="D">sort by rating: Descending</option>
          </select>
        </div>
        <div>
          <select
            onChange={handleFilterByGenre}
            value={genreFilter}
            className={styles.selectorButton}
          >
            <option value="all">filter by genre</option>
            {genresFilter}
            <option value="Genreless">Genreless</option>
          </select>
        </div>
        <div>
          <select
            onChange={handleFilterBySource}
            value={sourceFilter}
            className={styles.selectorButton}
          >
            <option value="all">filter by source</option>
            <option value="api">API Videogames</option>
            <option value="db">Database Videogames</option>
          </select>
        </div>
      </div>
      <div className={styles.refreshButtonFrame} onClick={handleRefresh}>
        <p>refresh</p>
      </div>
      <div className={styles.paginationContainer}>
        <img
          src={Arrow}
          onClick={handlePreviousPage}
          className={styles.arrowLeft}
        />
        <p className={styles.paginationPage}> page {currentPage} </p>
        <img
          src={Arrow}
          onClick={handleNextPage}
          className={styles.arrowRight}
        />
      </div>
      <div>
        {filteredVideogames ? (
          <div className={styles.cardList}>{videogamesList}</div>
        ) : (
          <div className={styles.loadingDiv}>
            <h1 className={styles.loadingH1}>loading cards...</h1>
          </div>
        )}
      </div>
    </div>
  );
}
