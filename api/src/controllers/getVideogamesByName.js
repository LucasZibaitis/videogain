const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame, Genre } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games?search=`;

const getVideogamesByName = async (req, res) => {
  try {
    const name = req.query.name;
    const apiResponse = await axios.get(`${URL}${name}&key=${API_KEY}`);

    // const dbResponse = Videogame.findAll({
    //   where: {
    //     name: {
    //       [Op.iLike]: `%${name}%`,
    //     },
    //   },
    //   include: Genre,
    // });

    const [apiVideogames] = await Promise.all([
      apiResponse
    ]);

    const apiVideogamesTransformed = apiVideogames.data.results.map(
      (videogame) => ({
        id: videogame.id,
        rating: videogame.rating,
        name: videogame.name,
        genres: videogame.genres,
        description: videogame.description,
        platforms: videogame.platforms,
        background_image: videogame.background_image,
      })
    );

    const combinedVideogames = [...apiVideogamesTransformed];

    const resultVideogames = combinedVideogames.slice(0, 15);

    return res.status(200).json(resultVideogames);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getVideogamesByName;
