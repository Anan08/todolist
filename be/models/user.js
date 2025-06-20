'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task, {
      foreignKey: 'userId',
      as : 'tasks'
    })
    }
  }
  User.init({
    firstName: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    lastName: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    email: {
      type : DataTypes.STRING,
      unique : true,
      allowNull : false,
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};