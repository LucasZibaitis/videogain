const axios = require("axios");
require("dotenv").config();
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const BASE_URL = "https://api.rawg.io/api/games";

const getVideogames = async (req, res) => {
  try {
    let allResults = [];
    let currentPage = 1;
    const pageSize = 100;

    const dbVideogames = await Videogame.findAll({ include: Genre });

    while (allResults.length < pageSize) {
      const { data } = await axios.get(
        `${BASE_URL}?key=${API_KEY}&page=${currentPage}`
      );
      const results = data.results;

      allResults = [...allResults, ...results];

      currentPage++;
    }

    const combinedGames = [...dbVideogames, ...allResults];

    return res.status(200).json(combinedGames);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getVideogames;
