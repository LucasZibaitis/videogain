const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games/`;

const getVideogamesById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`${URL}${id}?key=${API_KEY}`);
    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getVideogamesById;
