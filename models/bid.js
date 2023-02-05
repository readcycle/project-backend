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
    }
  }
  Bid.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "UserId cannot be null" },
          notEmpty: { msg: "UserId cannot be empty" },
        },
      },
      BookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "BookId cannot be null" },
          notEmpty: { msg: "BookId cannot be empty" },
        },
      },
      PostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "PostId cannot be null" },
          notEmpty: { msg: "PostId cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "Bid",
    }
  );
  return Bid;
};
