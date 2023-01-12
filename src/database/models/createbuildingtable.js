'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class createBuildingTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Edificio.belongsTo(models.Direccion, {as:'edificios'})
    }
  }
  createBuildingTable.init({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    adress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Edificio',
  });
  return createBuildingTable;
};