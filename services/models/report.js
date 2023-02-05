"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Report.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Title is required" },
          notNull: { msg: "Title is required" },
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Content is required" },
          notNull: { msg: "Content is required" },
        },
      },
      reporterId: DataTypes.INTEGER,
      reportedId: DataTypes.INTEGER,
      isSolved: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Report",
    }
  );
  return Report;
};
