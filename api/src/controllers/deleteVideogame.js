const { Videogame } = require("../db");

const deleteVideogame = async (req, res) => {
  const { id } = req.params;
  try {
    const videogame = await Videogame.findByPk(id);
    if (!videogame) {
      return res.status(404).json({ error: "Videogame not found" });
    }
    await videogame.destroy();
    return res.status(204).send("Videogame deleted");
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = deleteVideogame;
