const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: { type: DataTypes.TEXT, allowNull: false },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false,
      },
      background_image: { type: DataTypes.STRING, allowNull: false },
      released: { type: DataTypes.DATE, allowNull: false },
      rating: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      timestamps: false,
    }
  );
};
