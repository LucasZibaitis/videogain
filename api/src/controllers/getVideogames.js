const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const getVideogames = async (req, res) => {
  try {
    const { data } = await axios.get(URL);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getVideogames;
