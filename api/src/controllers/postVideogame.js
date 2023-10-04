const { Genre, Videogame } = require("../db");

const postVideogame = async (req, res) => {
  const { name, description, platforms, image, releaseDate, rating } = req.body;
  try {
    if (
      !name ||
      !description ||
      !platforms ||
      !image ||
      !releaseDate ||
      !rating
    ) {
      return res.status(401).send("Faltan datos");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
