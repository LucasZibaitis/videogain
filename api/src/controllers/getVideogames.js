const axios = require("axios");
require("dotenv").config();
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const BASE_URL = "https://api.rawg.io/api/games";

const getVideogames = async (req, res) => {
  try {
    // Obtén los videojuegos de la base de datos local
    const dbVideogames = await Videogame.findAll({ include: Genre });

    // Realiza una sola solicitud a la API
    const { data } = await axios.get(`${BASE_URL}?key=${API_KEY}`);

    // Procesa los resultados de la API
    const apiVideogames = data.results.map((result) => {
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

    // Combina los resultados de la base de datos y la API
    const combinedGames = [...dbVideogames, ...apiVideogames];

    // Devuelve la respuesta con un código de estado 200
    return res.status(200).json(combinedGames);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getVideogames;
