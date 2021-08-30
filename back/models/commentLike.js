'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commentLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Users.belongsToMany(models.Comments, {
        through: models.Like,
        foreignKey: 'userId',
        otherKey: 'commentId',
      });
  
      models.Comments.belongsToMany(models.Users, {
        through: models.Like,
        foreignKey: 'commentId',
        otherKey: 'userId',
      });
  
      models.commentLike.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'user',
      });
  
      models.commentLike.belongsTo(models.Comments, {
        foreignKey: 'commentId',
        as: 'comment',
      });
    };
  };
  commentLike.init({
    commentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'commentLike',
  });
  return commentLike;
};