'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({User}) {
      // define association here
       this.belongsTo(User, {foreignKey: 'userId', as: 'user'});
    }
  };
  Blog.init({
    topic: DataTypes.STRING,
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    conclusion: DataTypes.STRING,
    authorContact: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};