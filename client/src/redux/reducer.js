import {
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  FILTER_BY_GENRE,
  FILTER_BY_SOURCE,
  SET_ALL_VIDEOGAMES,
  SET_VIDEOGAMES_BY_NAME,
  SET_ALL_GENRES,
  SET_ALL_PLATFORMS,
} from "./actions";

const initialState = {
  allVideogames: [],
  filteredVideogames: [],
  allGenres: [],
  allPlatforms: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_VIDEOGAMES:
      return {
        ...state,
        allVideogames: action.payload,
      };
    case SET_VIDEOGAMES_BY_NAME:
      return {
        allVideogames: action.payload,
      };
    case SET_ALL_GENRES:
      return {
        ...state,
        allGenres: action.payload,
      };
    case SET_ALL_PLATFORMS:
      return {
        ...state,
        allPlatforms: action.payload,
      };
    case ORDER_BY_NAME:
      if (action.payload === "none") {
        return { ...state };
      }
      let orderedVideogamesByName = [...state.allVideogames];
      if (action.payload === "A") {
        orderedVideogamesByName.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (action.payload === "Z") {
        orderedVideogamesByName.sort((a, b) => b.name.localeCompare(a.name));
      }
      return {
        ...state,
        allVideogames: orderedVideogamesByName,
      };
    case ORDER_BY_RATING:
      if (action.payload === "none") {
        return { ...state };
      }
      let orderedVideogamesByRating = [...state.allVideogames];
      if (action.payload === "A") {
        orderedVideogamesByRating.sort((a, b) => a.rating - b.rating);
      }
      if (action.payload === "D") {
        orderedVideogamesByRating.sort((a, b) => b.rating - a.rating);
      }
      return {
        ...state,
        allVideogames: orderedVideogamesByRating,
      };
    case FILTER_BY_GENRE:
      if (action.payload === "all") {
        return { ...state };
      }
      const filteredVideogamesByGenre = state.allVideogames.filter(
        (videogame) =>
          videogame.genres.length > 0 &&
          videogame.genres[0].name === action.payload
      );
      return {
        ...state,
        filteredVideogames: filteredVideogamesByGenre,
      };
    default:
      return state;
  }
};

export default rootReducer;
