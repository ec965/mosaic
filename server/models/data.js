
module.exports = (sequelize, DataTypes, Model) => {
  class Data extends Model{}

  Data.init({
    data:{
      type: DataTypes.STRING,
    }
  },{sequelize});

  return Data;;
}