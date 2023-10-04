const axios = require("axios");
const { Videogame } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games/`;

const getVideogamesById = async (req, res) => {
  try {
    const { id } = req.params;

    const localVideogame = await Videogame.findOne({
      where: {
        id: id,
      },
    });

    if (localVideogame) {
      return res.status(200).json(localVideogame);
    }

    const { data } = await axios.get(`${URL}${id}?key=${API_KEY}`);
    if (!data) {
      return res.status(404).json({ message: "Videogame was not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getVideogamesById;
