import axios from "axios";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const SET_ALL_VIDEOGAMES = "SET_ALL_VIDEOGAMES";
export const SET_VIDEOGAMES_BY_NAME = "SET_VIDEOGAMES_BY_NAME";
export const SET_ALL_GENRES = "SET_ALL_GENRES";
export const SET_ALL_PLATFORMS = "SET_ALL_PLATFORMS";

export const setAllVideogames = (videogames) => ({
  type: SET_ALL_VIDEOGAMES,
  payload: videogames,
});

export const setVideogamesByName = (name) => {
  const endpoint = `http://localhost:3001/videogames/name?name=${name}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: SET_VIDEOGAMES_BY_NAME,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setAllGenres = (genres) => ({
  type: SET_ALL_GENRES,
  payload: genres,
});

export const setAllPlatforms = (platforms) => ({
  type: SET_ALL_PLATFORMS,
  payload: platforms,
});

export const orderCardsByName = (order) => {
  return { type: ORDER_BY_NAME, payload: order };
};
export const orderCardsByRating = (order) => {
  return { type: ORDER_BY_RATING, payload: order };
};

export const filterCardsByGenre = (genre) => {
  return { type: FILTER_BY_GENRE, payload: genre };
};

export const filterCardsBySource = (source) => {
  return { type: FILTER_BY_SOURCE, payload: source };
};
