const { Sequelize, DataTypes } = require("sequelize");
const path = require('path');
const env = process.env.NODE_ENV || 'development';

//connection à la base de données
const database = new Sequelize(
  `mysql://${process.env.SQL_USER}:${process.env.SQL_PASS}@${process.env.SQL_HOST}/${process.env.SQL_NAME}`
);

database
  .authenticate()
  .then(() =>
    console.log("Vous êtes maintenant connecté à la base de données !")
  )
  .catch((err) => console.log("erreur d'authentification: " + err));

module.exports = {
  Sequelize,
  DataTypes,
  database,
};

