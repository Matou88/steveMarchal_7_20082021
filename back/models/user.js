"use strict";
const { Sequelize, DataTypes, database } = require("./connection");

const User = database.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    bio: DataTypes.STRING,
  },
  {
    Sequelize,
    modelName: "User",
  }
);

module.exports = User;