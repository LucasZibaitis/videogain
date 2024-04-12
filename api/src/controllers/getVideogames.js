const axios = require("axios");
require("dotenv").config();
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const BASE_URL = "https://api.rawg.io/api/games";

const getVideogames = async (req, res) => {
  try {
    // const dbVideogames = await Videogame.findAll({ include: Genre });

    let allResults = [];
    let currentPage = 1;
    const pageSize = 100;

    while (allResults.length < pageSize) {
      const { data } = await axios.get(
        `${BASE_URL}?key=${API_KEY}&page=${currentPage}`
      );
      const results = data.results.map((result) => {
        const {
          id,
          name,
          background_image,
          rating,
          genres,
          platforms,
          description,
        } = result;
        return {
          id,
          name,
          background_image,
          rating,
          genres,
          platforms,
          description,
        };
      });

      allResults = [...allResults, ...results];

      currentPage++;
    }

    const combinedGames = [...allResults];

    return res.status(200).json(combinedGames);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getVideogames;
