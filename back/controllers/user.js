const bcrypt = require("bcrypt"); //Permet de hasher et saler les mots de passe
const jwt = require("jsonwebtoken"); //Permet de créer un token utilisateur
const fs = require("fs"); //système de gestion de fichier de Node
const identification = require("../utils/identification");
const { User } = require("../models/index");
const passwordValidator = require("password-validator");
const schema = new passwordValidator(); //On crée un schema pour obtenir des mots de passe plus sécurisés
schema
  .is().min(8) // min 8 caractères
  .has().digits(1) // min 1 chiffre
  .has().uppercase(1) // min 1 caractère majuscule
  .has().lowercase(1) // min 1 caractère minuscule
  .has().symbols(1) // min 1 symbole
  .has().not().spaces(); // ne doit pas contenir d'espace

//Enregistrement d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  if (!schema.validate(req.body.password)) {
    //Vérifie si  le schema de mot de passe est pas respecté
    res.status(401).json({
      message: `Mot de passe pas assez sécurisé, il doit contenir au moins 8 caractères, un chiffre, une majuscule, une minuscule, un symbole et ne pas contenir d'espace !`,
    });
    return false;
  }
  bcrypt.hash(req.body.password, 10) //On hash le mot de passe et on le "sale" 10 fois
  .then((hash) => {
    delete req.body.password;
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    })
      .then(() => res.status(201).json({ message: `Utilisateur créé !` }))
      .catch((error) => res.status(400).json({ error }));
  })
  .catch((error) => res.status(500).json({ error }));
};

//Connection d'un utlisateur existant
exports.login = (req, res, next) => {
  const email = req.body.email;
  User.findOne({
    where: { email },
  })
  .then((user) => {
    if (!user) {
      return res.status(401).json({ error: `Utilisateur non trouvé !` });
    }
    bcrypt
      .compare(req.body.password, user.password) //on compare le mot de passe de la requête avec le hash de l'utilisateur
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: `Mot de passe incorrect !` });
        }
        res.status(200).json({
          userId: user.id,
          token: jwt.sign(
            { userId: user.id, is_admin: user.is_admin },
            process.env.TKN,
            {
              expiresIn: "24h",
            }
          ),
          is_admin: user.is_admin,
        });
      })
      .catch((error) => res.status(500).json({ error }));
  })
  .catch((error) => res.status(500).json({ error }));
};

//Modifier un utilisateur
exports.modifyUser = (req, res, next) => {
  const id = JSON.parse(req.params.id);
  const userId = identification.userId(req);
  if (id === userId) {
    User.findOne({ where: { id: id } })
    .then((user) => {
      if (req.file) {
        if (user.image !== null) {
          const fileName = user.image.split(`/images/`)[1];
          fs.unlink(`images/${fileName}`, (err) => {
            if (err) console.log(err);
            else {
              console.log(`Image supprimée: ` + fileName);
            }
          });
        }
        req.body.image = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      }
      delete req.body.password;
      user
        .update({ ...req.body, id: req.params.id })
        .then(() =>
          res.status(200).json({ message: `Votre profil est modifié !` })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
  } else {
    return res
      .status(401)
      .json({ error: `Vous n'avez pas l'autorisation nécessaire !` });
  }
};

//Modifier un mot de passe utilisateur
exports.modifyPassword = (req, res, next) => {
  const id = JSON.parse(req.params.id);
  const userId = identification.userId(req);
  const password = req.body.password;
  if (id === userId) {
    User.findOne({ where: { id: id } })
    .then((user) => {
      if (!schema.validate(req.body.password)) {
        res.status(401).json({
          message: `Mot de passe pas assez sécurisé, il doit contenir au moins 8 caractères, un chiffre, une majuscule, une minuscule, un symbole et ne pas contenir d'espace !`,
        });
        return false;
      }
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          user
            .update({
              password: hash,
              id: req.params.id,
            })
            .then(() =>
              res.status(201).json({ message: `Mots de passe modifié` })
            )
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
  } else {
    return res
      .status(401)
      .json({ error: `Vous n'avez pas l'autorisation nécessaire !` });
  }
};

//Afficher un profil utilisateur
exports.getOneProfile = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

//Afficher tous les profils utilisateurs
exports.getAllProfile = (req, res, next) => {
  User.findAll({ order: [[`username`, `ASC`]] })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(404).json({ error }));
};

//Supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
  const id = JSON.parse(req.params.id);
  const userId = identification.userId(req);
  const isAdmin = identification.isAdmin(req);

  if (id === userId || isAdmin) {
    User.findOne({ where: { id: id } })
    .then((user) => {
      if (user.image !== null) {
        const fileName = user.image.split("/images/")[1];
        fs.unlink(`images/${fileName}`, (err) => {
          if (err) console.log(err);
          else {
            console.log(`Image supprimée: ` + fileName);
          }
        });
      }
      user
        .destroy({ where: { id: id } })
        .then(() =>
          res.status(200).json({ message: "Utilisateur supprimé !" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
  } else {
    return res
      .status(401)
      .json({ error: `Vous n'avez pas l'autorisation nécessaire !` });
  }
};