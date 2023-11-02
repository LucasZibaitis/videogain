const { Videogame } = require("../db");

const deleteVideogame = async (req, res) => {
  const { id } = req.params;
  try {
    const videogame = Videogame.findByPk(id);
    if (!videogame) {
      return res.status(404).json({ error: "Videogame not found" });
    }
    await videogame.destroy();
    console.log("se borro");
    return res.status(204).send("Videogame deleted");
  } catch (error) {
    console.log("no se borro");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = deleteVideogame;
