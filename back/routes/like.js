const express = require("express"); // pour importer application Express
const router = express.Router(); // pour créer un routeur Express

const auth = require("../middlewares/auth"); // pour importer le middleware auth
const multer = require("../middlewares/multer-config"); // pour importer le middleware multer
const likeCtrl = require("../controllers/like"); // pour importer le controleur

router.post("/post/:id", auth, likeCtrl.likePost); //like un post
router.get("/post/:id", auth, likeCtrl.getLike); //Récupérer les like d'un post
router.get("/:idPost/like/:id", auth, likeCtrl.isLiked); //Renvoie le like si un utilisateur aime un post

module.exports = router;