"use strict";
const { Model } = require("sequelize");
const { funcHashValue } = require("../helper/bcryptHandler");
// const { hashPwd } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email must be unique" },
        validate: {
          notEmpty: { msg: "Email is required" },
          notNull: { msg: "Email is required" },
          isEmail: { msg: "Invalid format email" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is required" },
          notNull: { msg: "Password is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );

  Admin.addHook("beforeCreate", (admin) => {
    admin.password = funcHashValue(admin.password);
  });

  return Admin;
};
