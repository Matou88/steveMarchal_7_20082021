const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');

require('dotenv').config();

const app = express(); //Applique le framework express
// const db = require('./models');

//Importation des routes
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comment");
const likeRoutes = require("./routes/like");

app.use(helmet()); // Sécurité du http

// Paramètres d'en-tête
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); //Permet l'accès à l'API depuis n'importe quelle origine
    res.setHeader(
      //Autorise les en-têtes spécifiés
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      //Permet l'utilisation des méthodes définies ci-dessous
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

app.use(cors()); // CORS - partage de ressources entre serveurs

// Pour parser
app.use(bodyParser.json());

//Permet de récupérer le corps de la requête au format json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Definition des routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/like", likeRoutes);

module.exports = app;
