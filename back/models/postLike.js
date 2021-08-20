'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Users.belongsToMany(models.Posts, {
        through: models.Like,
        foreignKey: 'userId',
        otherKey: 'postId',
      });
  
      models.Posts.belongsToMany(models.Users, {
        through: models.Like,
        foreignKey: 'postId',
        otherKey: 'userId',
      });
  
      models.postLike.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'user',
      });
  
      models.postLike.belongsTo(models.Posts, {
        foreignKey: 'postId',
        as: 'post',
      });
    };
  };
  postLike.init({
    postId:
      DataTypes.INTEGER,
      references: {
        model:'posts',
        key: 'id'
      },
    userId: 
      DataTypes.INTEGER,
      references: {
        model:'users',
        key: 'id'
      }
  }, {
    sequelize,
    modelName: 'postLike',
  });
  return postLike;
};