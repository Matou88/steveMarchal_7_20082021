const express = require("express"); // pour importer application Express
const router = express.Router(); // pour créer un routeur Express

const auth = require("../middlewares/auth"); // pour importer le middleware auth
const multer = require("../middlewares/multer-config"); // pour importer le middleware multer
const commentCtrl = require("../controllers/comment"); // pour importer le controleur

router.post("/", auth, multer, commentCtrl.createComment); //Créer un commentaire
router.delete("/:id", auth, commentCtrl.deleteComment); //Supprime un commentaire existant
router.get("/:id", auth, commentCtrl.getComments); //affiche un commentaire existant

module.exports = router;