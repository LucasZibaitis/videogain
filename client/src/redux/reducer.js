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
      let orderedVideogames = [...state.allVideogames];
      if (action.payload === "A") {
        orderedVideogames.sort((a, b) => a.name - b.name);
      }
      if (action.payload === "Z") {
        orderedVideogames.sort((a, b) => b.name - a.name);
      }
      return {
        allVideogames: orderedVideogames,
      };
    default:
      return state;
  }
};

export default rootReducer;
