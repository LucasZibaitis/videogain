const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games?search=`;

const getVideogamesByName = async (req, res) => {
  try {
    const name = req.query.name;
    const apiResponse = await axios.get(`${URL}${name}&key=${API_KEY}`);

    const apiGames = apiResponse.data.results;

    const filteredGames = apiGames
      .filter((game) => game.name.toLowerCase().includes(name.toLowerCase()))
      .slice(0, 15);

    return res.status(200).json(filteredGames);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getVideogamesByName;
