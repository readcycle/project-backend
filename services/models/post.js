"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User);
      Post.belongsTo(models.Genre);
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Title is required" },
          notNull: { msg: "Title is required" },
        },
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Author is required" },
          notNull: { msg: "Author is required" },
        },
      },
      condition: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Condition is required" },
          notNull: { msg: "Condition is required" },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Description is required" },
          notNull: { msg: "Description is required" },
        },
      },
      UserId: DataTypes.INTEGER,
      GenreId: DataTypes.INTEGER,
      isClosed: DataTypes.BOOLEAN,
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Image is required" },
          notNull: { msg: "Image is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
