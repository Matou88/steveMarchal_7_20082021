"use strict";
const { Sequelize, DataTypes, database } = require("./connection");

const Post = database.define(
  "Post",
  {
    content: DataTypes.TEXT,
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comments: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
  },
  {
    Sequelize,
    modelName: "Post",
  }
);

module.exports = Post;