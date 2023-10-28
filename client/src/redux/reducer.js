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
  dbVideogames: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_VIDEOGAMES:
      return {
        ...state,
        allVideogames: action.payload,
        filteredVideogames: action.payload,
      };
    case SET_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        allVideogames: action.payload,
        filteredVideogames: action.payload,
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
        return { ...state, filteredVideogames: state.allVideogames };
      }
      let orderedVideogamesByName = [...state.filteredVideogames];
      if (action.payload === "A") {
        orderedVideogamesByName.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (action.payload === "Z") {
        orderedVideogamesByName.sort((a, b) => b.name.localeCompare(a.name));
      }
      return {
        ...state,
        filteredVideogames: orderedVideogamesByName,
      };
    case ORDER_BY_RATING:
      if (action.payload === "none") {
        return { ...state, filteredVideogames: state.allVideogames };
      }
      let orderedVideogamesByRating = [...state.filteredVideogames];
      if (action.payload === "A") {
        orderedVideogamesByRating.sort((a, b) => a.rating - b.rating);
      }
      if (action.payload === "D") {
        orderedVideogamesByRating.sort((a, b) => b.rating - a.rating);
      }
      return {
        ...state,
        filteredVideogames: orderedVideogamesByRating,
      };
    case FILTER_BY_GENRE:
      if (action.payload === "all") {
        return { ...state, filteredVideogames: state.allVideogames };
      }
      const filteredVideogamesByGenre = state.allVideogames.filter(
        (videogame) => {
          if (action.payload === "Genreless") {
            return !videogame.genres || videogame.genres.length === 0;
          } else {
            const firstGenre = videogame.genres ? videogame.genres[0] : null;
            return firstGenre ? firstGenre.name === action.payload : false;
          }
        }
      );
      return {
        ...state,
        filteredVideogames: filteredVideogamesByGenre,
      };
    case FILTER_BY_SOURCE:
      if (action.payload === "all") {
        return { ...state, filteredVideogames: state.allVideogames };
      }
      if (action.payload === "api") {
        const filteredVideogamesBySource = state.allVideogames.filter(
          (videogame) => typeof videogame.id === "number"
        );
        return {
          ...state,
          filteredVideogames: filteredVideogamesBySource,
        };
      }
      if (action.payload === "db") {
        const filteredVideogamesBySource = state.allVideogames.filter(
          (videogame) => typeof videogame.id !== "number"
        );
        return { ...state, filteredVideogames: filteredVideogamesBySource };
      }
    default:
      return state;
  }
};

export default rootReducer;
