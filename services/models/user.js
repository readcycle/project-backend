"use strict";
const { Model } = require("sequelize");
const { funcHashValue } = require("../helper/bcryptHandler");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Report, {
        foreignKey: "reporterId",
        as: "Reporter",
      });
      User.hasMany(models.Report, {
        foreignKey: "reportedId",
        as: "Reported",
      });
    }
  }
  User.init(
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Fullname cannot be null" },
          notEmpty: { msg: "Fullname cannot be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: { msg: "Email is taken already" },
        allowNull: false,
        validate: {
          notNull: { msg: "Email cannot be null" },
          notEmpty: { msg: "Email cannot be empty" },
          isEmail: { msg: "Only Email Format" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password cannot be null" },
          notEmpty: { msg: "Password cannot be empty" },
          len: {
            args: [5, 255],
            msg: "Password must have more than 4 characters",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        unique: { msg: "Email is taken already" },
        allowNull: false,
        validate: {
          notNull: { msg: "Email cannot be null" },
          notEmpty: { msg: "Email cannot be empty" },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "City cannot be null" },
          notEmpty: { msg: "City cannot be empty" },
        },
      },
      favoriteGenre: DataTypes.STRING,
      favoriteBook: DataTypes.STRING,
      location: {
        type: DataTypes.GEOMETRY("POINT"),
      },
      isBanned: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance) => {
    instance.password = funcHashValue(instance.password);
  });

  return User;
};
