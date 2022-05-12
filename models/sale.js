'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({Rod}) {
      // define association here
      this.hasMany(Rod, { foreignKey: 'salesId', as: 'sales', onDelete: 'cascade', hooks: true });
    }
  };
  Sale.init({
    amount: DataTypes.INTEGER,
    type: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    purpose: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Sale',
  });
  return Sale;
};