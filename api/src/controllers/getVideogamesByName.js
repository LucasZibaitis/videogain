const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games?search=`;

const getVideogamesByName = async (req, res) => {
  try {
    const { name } = req.query;
    const { data } = await axios.get(`${URL}${name}&key=${API_KEY}`);
    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getVideogamesByName;
