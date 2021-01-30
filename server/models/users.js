const bcrypt = require('bcrypt');
const saltRounds = require('../config/salt')
module.exports = (sequelize, DataTypes, Model) => {
  class User extends Model{
    static hashPassword(password){
      return bcrypt.hash(password, saltRounds);
    }

    checkPassword(password){
      return bcrypt.compare(password, this.password);
    }
  }
  User.init({
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password:{
      type:DataTypes.STRING,
      allownNull: false,
    }
  },{
    sequelize,
    modelName: 'user'
  });
  return User;
}