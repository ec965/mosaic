
module.exports = (sequelize, DataTypes, Model) => {
  class Data extends Model{}

  Data.init({
    data:{
      type: DataTypes.STRING,
    }
  },{
    sequelize,
    modelName: 'data'
  });

  return Data;;
}