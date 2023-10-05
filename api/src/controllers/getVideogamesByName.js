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

    const dbResponse = Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: 15,
    });

    const [apiGames, dbGames] = await Promise.all([apiResponse, dbResponse]);

    const combinedGames = [...dbGames, ...apiGames.data.results];

    const resultGames = combinedGames.slice(0, 15);

    return res.status(200).json(resultGames);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getVideogamesByName;
