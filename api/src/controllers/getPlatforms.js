const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const BASE_URL = "https://api.rawg.io/api/platforms";

const getPlatforms = async (req, res) => {
  try {
    let platforms = [];
    let nextPage = `${BASE_URL}?key=${API_KEY}`;

    while (nextPage) {
      const { data } = await axios.get(nextPage);
      const results = data.results;
      const platformNames = results.map((platform) => platform.name);
      platforms = [...platforms, ...platformNames];

      nextPage = data.next;
    }

    return res.status(200).json(platforms);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getPlatforms;
