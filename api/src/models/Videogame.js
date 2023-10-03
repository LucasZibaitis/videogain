const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("videogame", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: { type: DataTypes.TEXT("long"), allowNull: false },
    platforms: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    releaseDate: { type: DataTypes.DATE, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
  });
};
