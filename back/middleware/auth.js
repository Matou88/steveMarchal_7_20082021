/* Ce Middleware va nous permettre de protéger les routes sélectionnées en vérifiant que l'utilisateur est authentifié
 avant d'autoriser l'envoi de ses requêtes. */

 const jwt = require('jsonwebtoken'); // Importation de jsonwebtoken qui va nous permettre décoder le token avec une clé secrète

 module.exports = (req, res, next) => {
   try {
     const token = req.headers.authorization.split(' ')[1];
     const decodedToken = jwt.verify(token, 'Ceci est un token secret à complexifier avant le lancement !');
     const userId = decodedToken.userId;
     if (req.body.userId && req.body.userId !== userId) {
       throw 'Invalid user ID';
     } else {
       next();
     }
   } catch {
     res.status(401).json({
       error: new Error('Invalid request!')
     });
   }
 };