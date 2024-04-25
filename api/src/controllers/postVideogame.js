const { Videogame } = require("../db");
const { v4: uuidv4 } = require("uuid");

const postVideogame = async (req, res) => {
  const {
    name,
    description,
    platforms,
    background_image,
    released,
    rating,
    genres,
  } = req.body;
  try {
    if (
      !name ||
      !description ||
      !platforms ||
      !background_image ||
      !released ||
      !rating ||
      !genres
    ) {
      return res.status(401).send("Faltan datos");
    }

    const uniqueId = uuidv4();
    const newVideogame = await Videogame.create({
      id: uniqueId,
      name: name,
      description: description,
      platforms: platforms,
      background_image: background_image,
      released: released,
      rating: rating,
    });
    if (genres && genres.length > 0) {
      await newVideogame.setGenres(genres);
    }
    const genresDBB = await newVideogame.getGenres();
    console.log("Géneros asociados:", genresDBB);
    return res.status(200).send(newVideogame);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postVideogame;
