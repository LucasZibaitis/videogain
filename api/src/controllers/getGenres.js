const { Genre } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;

const getGenres = async (req, res) => {
  try {
    const { data } = await axios.get(URL);
    const genresFromAPI = data.results;

    for (const genreData of genresFromAPI) {
      const existingGenre = await Genre.findOne({
        where: { id: genreData.id },
      });

      if (!existingGenre) {
        await Genre.create({
          id: genreData.id,
          name: genreData.name,
        });
      }
    }
    return res.status(200).send(genresFromAPI);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getGenres;
