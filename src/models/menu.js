"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Favorite, {
        foreignKey: { allowNull: true, onDelete: "SET NULL" },
      });
      this.hasMany(models.History, {
        foreignKey: { allowNull: true, onDelete: "SET NULL" },
      });
    }
  }
  Menu.init(
    {
      name: DataTypes.STRING,
      label: DataTypes.STRING,
      kkal: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Menu",
      paranoid: true,
    }
  );
  return Menu;
};
