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
    gender : {
      type : DataTypes.STRING,
      allowNull : true,
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,  
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    username : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
  });
  return User;
};