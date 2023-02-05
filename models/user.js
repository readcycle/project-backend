'use strict';
const {
  Model
} = require('sequelize');
const { hashPwd } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Report, {foreignKey: 'reporterId'})
      User.hasMany(models.Report, {foreignKey: 'reportedId'})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Username is required"},
        notNull: {msg: "Username is required"}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Email is required"},
        notNull: {msg: "Email is required"},
        isEmail: {args: true, msg: "Invalid format email"},
        isUnique(value, next){
          User.findAll({
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
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Phone Number is required"},
        notNull: {msg: "Phone Number is required"}
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "City is required"},
        notNull: {msg: "City is required"}
      }
    },
    favoriteGenre: DataTypes.STRING,
    favoriteBook: DataTypes.STRING,
    isBanned: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook("beforeCreate", user => {
    user.password = hashPwd(user.password)
  })

  return User;
};