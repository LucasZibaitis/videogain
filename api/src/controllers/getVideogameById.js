const axios = require("axios");
const { Videogame, Genre } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games/`;

const getVideogamesById = async (req, res) => {
  try {
    const { id } = req.params;
    const isUUID = /^[0-9a-fA-F-]{36}$/.test(id);

    if (isUUID) {
      const dbResponse = await Videogame.findOne({
        where: {
          id: id,
        },
        include: Genre,
      });
      if (dbResponse) {
        return res.status(200).json(dbResponse);
      } else {
        return res.status(404).json({ message: "Videogame was not found" });
      }
    } else {
      const apiResponse = await axios.get(`${URL}${id}?key=${API_KEY}`);
      const apiGame = apiResponse.data;
      if (apiGame) {
        const {
          id,
          rating,
          name,
          platforms,
          genres,
          background_image,
          description,
          released,
        } = apiGame;
        const response = {
          id,
          rating,
          name,
          platforms,
          genres,
          background_image,
          description,
          released,
        };
        return res.status(200).json(response);
      } else {
        return res.status(404).send("Videogame was not found");
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getVideogamesById;
