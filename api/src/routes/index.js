const { Router } = require("express");
const getVideogames = require("../controllers/getVideogames");
const getVideogameById = require("../controllers/getVideogameById");
const getVideogamesByName = require("../controllers/getVideogamesByName");
const postVideogame = require("../controllers/postVideogame");
const getGenres = require("../controllers/getGenres");
const getPlatforms = require("../controllers/getPlatforms");

const router = Router();

router.get("/videogames", getVideogames);

router.get("/videogames/videogame/:id", getVideogameById);

router.get("/videogames/name", getVideogamesByName);

router.post("/videogames", postVideogame);

router.get("/videogames/genres", getGenres);

router.get("/videogames/platforms", getPlatforms);

module.exports = router;
