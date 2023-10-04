const { Genre, Videogame } = require("../db");

const postVideogame = async (req, res) => {
  const { name, description, platforms, image, releaseDate, rating, genres } =
    req.body;
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
    const newVideogame = await Videogame.create({
      name: name,
      description: description,
      platforms: platforms,
      image: image,
      releaseDate: releaseDate,
      rating: rating,
    });
    if (genres && genres.length > 0) {
      await newVideogame.setGenres(genres);
    }
    return res.status(200).send(newVideogame);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postVideogame;
