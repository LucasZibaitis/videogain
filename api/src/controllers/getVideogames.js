const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const BASE_URL = "https://api.rawg.io/api/games";

const getVideogames = async (req, res) => {
  try {
    let allResults = [];
    let currentPage = 1;
    const pageSize = 100;

    while (allResults.length < pageSize) {
      const { data } = await axios.get(
        `${BASE_URL}?key=${API_KEY}&page=${currentPage}`
      );
      const results = data.results;

      allResults = [...allResults, ...results];

      currentPage++;
    }

    return res.status(200).json(allResults);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getVideogames;
