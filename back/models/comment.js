"use strict";
const { Sequelize, DataTypes, database } = require("./connection");

const Comment = database.define(
  "Comment",
  {
    content: DataTypes.TEXT,
  },
  {
    Sequelize,
    modelName: "Comment",
  }
);

module.exports = Comment;