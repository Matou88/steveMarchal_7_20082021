// module.exports = router;
const express = require("express");
const router = express.Router(); //Permet de charger le middleware niveau router

const userCtrl = require("../controllers/user"); //On appelle la logique métier de nos routes
const multer = require("../middlewares/multer-config");

const authentificationLimiter = require("../middlewares/authentificationLimiter"); //On appelle le middleware authentificationLimiter

router.post("/signup", userCtrl.signup); //Créer un nouvel utilisateur
router.post("/login", authentificationLimiter, userCtrl.login); //Login d'un utilisateur existant

router.get("/profile/:id", multer, userCtrl.getOneProfile); //Affiche un profil utilisateur
router.get("/profile/", multer, userCtrl.getAllProfile); //Affiche tous les profils utilisateurs
router.put("/profile/:id", multer, userCtrl.modifyUser); //Modifier un utilisateur
router.put("/profile/:id/password", multer, userCtrl.modifyPassword); //Modifier un mot de passe utilisateur
router.delete("/profile/:id", multer, userCtrl.deleteUser); //Supprimer un utilisateur

module.exports = router;