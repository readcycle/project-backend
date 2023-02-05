"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bid.belongsTo(models.User);
      Bid.belongsTo(models.Book);
      Bid.belongsTo(models.Post);
    }
  }
  Bid.init(
    {
      UserId: DataTypes.INTEGER,
      BookId: DataTypes.INTEGER,
      PostId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Bid",
    }
  );
  return Bid;
};
