const sequelize = require('../config/db');
const {DataTypes, Model} = require('sequelize');
const UserModel = require('./users');
const DataModel = require('./data');

const User = UserModel(sequelize,DataTypes, Model);
const Data = DataModel(sequelize,DataTypes, Model);
User.hasMany(Data);
Data.belongsTo(User, {
  foreignKey: "userId"
});

module.exports={User, Data};