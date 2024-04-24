import React, { useState } from "react";
import Card from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import {
  orderCardsByRating,
  filterCardsByGenre,
  filterCardsBySource,
  orderCardsByName,
  setVideogamesByName,
  setIsLoading,
} from "../../redux/actions";
import Arrow from "./Arrow.png";

export default function Cards(props) {
  const { fetchVideogames } = props;
  const dispatch = useDispatch();
  const filteredVideogames = useSelector((state) => state.filteredVideogames);
  const allGenres = useSelector((state) => state.allGenres);
  const isLoading = useSelector((state) => state.isLoading);
  const [name, setName] = useState("");
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
    setCurrentPage(1);
    const selectedOrder = e.target.value;
    dispatch(orderCardsByName(selectedOrder));
    setNameOrder(selectedOrder);
    setRatingOrder("none");
  };

  const handleOrderByRating = (e) => {
    setCurrentPage(1);
    const selectedOrder = e.target.value;
    dispatch(orderCardsByRating(selectedOrder));
    setRatingOrder(selectedOrder);
    setNameOrder("none");
  };

  const handleSearch = () => {
    dispatch(setIsLoading(true));
    dispatch(setVideogamesByName(name));
    setCurrentPage(1);
    setNameOrder("none");
    setRatingOrder("none");
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleRefresh = async () => {
    dispatch(setIsLoading(true));
    setNameOrder("none");
    setRatingOrder("none");
    setName("");
    setGenreFilter("all");
    setSourceFilter("all");
    setCurrentPage(1);
    try {
      await fetchVideogames();
    } catch (error) {}
  };

  const genresFilter = allGenres.map((genre) => (
    <option value={genre.name}>{genre.name}</option>
  ));

  const handleFilterByGenre = (e) => {
    setCurrentPage(1);
    const selectedFilter = e.target.value;
    dispatch(filterCardsByGenre(selectedFilter));
    setGenreFilter(selectedFilter);
    setSourceFilter("all");
  };

  const handleFilterBySource = (e) => {
    setCurrentPage(1);
    const selectedFilter = e.target.value;
    dispatch(filterCardsBySource(selectedFilter));
    setSourceFilter(selectedFilter);
    setGenreFilter("all");
  };

  return (
    <div class="h-full flex flex-col gap-8 text-white py-4 items-center">
      <div class="flex justify-around h-9 w-5/6">
        <div class="flex h-9 w-1/3 relative">
          <input
            type="text"
            onChange={handleChange}
            value={name}
            class="text-[#3c4999] text-2xl rounded-lg w-3/5 px-2 outline-none"
          />
          <button
            onClick={handleSearch}
            class="text-2xl absolute right-12 border-l-0 rounded-tl-none rounded-bl-none border-white rounded-lg border-2 flex items-center justify-center w-1/3 pl-4 hover:text-[#3c4999] transition-all duration-200"
          >
            search
          </button>
        </div>
        <div class="flex  gap-8">
          <img
            src={Arrow}
            onClick={handlePreviousPage}
            class="hover:scale-110 transition-all duration-200 cursor-pointer"
          />
          <p class="text-2xl"> page {currentPage} </p>
          <img
            src={Arrow}
            onClick={handleNextPage}
            class="rotate-180 hover:scale-110 transition-all duration-200 cursor-pointer"
          />
        </div>
        <button
          onClick={handleRefresh}
          class=" text-2xl flex border-2 border-white rounded-lg w-40 items-center justify-center hover:text-[#3c4999] transition-all duration-200"
        >
          refresh
        </button>
      </div>

      <div class="flex justify-around gap-8 w-5/6">
        <select
          onChange={handleOrderByName}
          value={nameOrder}
          class="bg-transparent border-2 rounded-lg text-2xl w-2/4  text-center cursor-pointer hover:bg-[#3c4999] transition-all duration-200 hover:border-2 hover:border-[#3c4999]"
        >
          <option value="none">sort by name</option>
          <option value="A">sort by name: A to Z</option>
          <option value="Z">sort by name: Z to A</option>
        </select>

        <select
          onChange={handleOrderByRating}
          value={ratingOrder}
          class="bg-transparent border-2 rounded-lg text-2xl w-2/4  text-center cursor-pointer hover:bg-[#3c4999] transition-all duration-200 hover:border-2 hover:border-[#3c4999]"
        >
          <option value="none">sort by rating</option>
          <option value="A">sort by rating: Ascending</option>
          <option value="D">sort by rating: Descending</option>
        </select>

        <select
          onChange={handleFilterByGenre}
          value={genreFilter}
          class="bg-transparent border-2 rounded-lg text-2xl w-2/4  text-center cursor-pointer hover:bg-[#3c4999] transition-all duration-200 hover:border-2 hover:border-[#3c4999]"
        >
          <option value="all">filter by genre</option>
          {genresFilter}
          <option value="Genreless">Genreless</option>
        </select>

        <select
          onChange={handleFilterBySource}
          value={sourceFilter}
          class="bg-transparent border-white border-2 rounded-lg text-2xl w-2/4 text-center cursor-pointer hover:bg-[#3c4999] transition-all duration-200 hover:border-2 hover:border-[#3c4999]  h-9"
        >
          <option value="all">filter by source</option>
          <option value="api">API Videogames</option>
          <option value="db">Database Videogames</option>
        </select>
      </div>

      <div class="h-full ">
        {isLoading ? (
          <div class="mt-10 h-1/2 flex items-center">
            <h1 class="text-4xl font-light">loading cards...</h1>
          </div>
        ) : (
          <div class="h-full">
            {filteredVideogames.length === 0 ? (
              <div class="mt-10 h-1/2 flex items-center">
                <h1 class="text-4xl font-light">no videogames were found</h1>
              </div>
            ) : (
              <div class="mt-10 grid grid-cols-5 gap-x-20 gap-y-6 pb-10">
                {videogamesList}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
