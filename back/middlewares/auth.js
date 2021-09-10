// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// module.exports = (req, res, next) => {
//     try {
//         // Verification que le token est bien présent
//         if (!req.headers.authorization) {
//             throw 'Token d\'authentification manquant !';
//         }

//         const token = req.headers.authorization.split(' ')[1];
//         const decodedToken = jwt.verify(token, process.env.TKN);
//         const userId = decodedToken.userId;

//         if (req.body.userId && parseInt(req.body.userId, 10) !== userId) {
//             throw 'Identifiant utilisateur invalide';
//         } else {
//             res.locals.userId = userId;
//             next();
//         }
//     } catch (error) {
//         return res.status(400).json({ error })
//     }
// };

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //On extrait le token de la requête
    const decodedToken = jwt.verify(token, process.env.TKN); //On décrypte le token grâce à la clé secrète
    const userId = decodedToken.userId; //On récupère l'userId du token décrypté
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID"; //Renvoie une erreur si l'id décodé de la requête ne correspond pas l'id de l'utilisateur
    } else {
      next(); //Sinon, l'authentification est réussie et la suite du code peut s'exécuter
    }
  } catch (err) {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};