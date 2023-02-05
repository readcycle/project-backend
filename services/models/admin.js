'use strict';
const {
  Model
} = require('sequelize');
const { hashPwd } = require('../helpers/bcrypt')
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
  Admin.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Email is required"},
        notNull: {msg: "Email is required"},
        isEmail: {args: true, msg: "Invalid format email"},
        isUnique(value, next){
          Admin.findAll({
            where: {email: value},
            attributes: ['id']
          })
          .then(admin => {
            if(admin.length != 0) next(new Error("Email must be unique"))
            next()
          })
          .catch(error => next(error))
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Password is required"},
        notNull: {msg: "Password is required"}
      }
    }
  }, {
    sequelize,
    modelName: 'Admin',
  });

  Admin.addHook("beforeCreate", admin => {
    admin.password = hashPwd(admin.password)
  })

  return Admin;
};