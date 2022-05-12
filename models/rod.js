'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({Sale}) {
      // define association here
      this.belongsTo(Sale, {foreignKey: 'salesId', as: 'sales'});
    }
  };
  Rod.init({
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    type: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rod',
  });
  return Rod;
};