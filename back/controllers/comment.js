// const db = require('../models');

// exports.deleteComment = (req, res, next) => {
//     if (res.locals.userRoles.includes('ADMIN')) {
//         db.Comment.destroy({ where: { id: req.params.id } })
//             .then(() => res.status(200).json({ message: 'Post supprimé !' }))
//             .catch(error => res.status(404).json({ error }))
//     } else {
//         return res.status(403).json({ error: 'Vous ne disposez pas de droits suffisants' })
//     }
// }

// exports.createComment = (req, res, next) => {
//     db.Post.findOne({ where: { id: req.body.postId } })
//         .then(post => {           
//             if (!post) {
//                 return res.status(404).json({ error: 'Post introuvable !' })
//             }

//             db.Comment.create({
//                 message: req.body.message,
//                 ownerId: res.locals.userId,
//                 postId: post.id
//             })
//                 .then(comment => res.status(201).json({ comment }))
//                 .catch(error => res.status(400).json({ error }))
//         })
//         .catch(error => res.status(400).json({ error }))
// }

const { User, Post, Comment, Like } = require("../models/index");
const identification = require("../utils/identification");

//Commenter un post
exports.createComment = (req, res, next) => {
  const userId = identification.userId(req);
  const postId = req.body.postId;
  const content = req.body.content;
  if (content !== null) {
    Comment.create({
      userId: userId,
      postId: postId,
      content: req.body.content,
    }),
      Post.findOne({ where: { id: postId } }) //On sélectionne le post par son id
        .then((post) => {
          post
            .update(
              {
                comments: post.comments + 1, //on ajoute 1 au comments
              },
              { id: postId }
            )
            .then(() =>
              res.status(200).json({ message: "Nouveau commentaire envoyé !" })
            )
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
  } else {
    return res.status(401).json({ error: "Commentaire non valide" });
  }
};

//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  const id = req.params.id;
  const userId = identification.userId(req);
  Comment.findOne({ where: { id: id } })
    .then((comment) => {
      if (comment.userId == userId) {
        Post.findOne({ where: { id: comment.postId } }).then((post) => {
          post
            .update(
              {
                comments: post.comments - 1, //on supprime 1 au comments
              },
              { id: comment.postId }
            )
            .then(() =>
              res.status(200).json({ message: "Commentaire supprimé !" })
            )
            .catch((error) => res.status(400).json({ error }));
        }),
          comment
            .destroy({ where: { id: id } })
            .catch((error) => res.status(400).json({ error }));
      } else {
        return res
          .status(401)
          .json({ error: "Vous n'avez pas l'autorisation nécessaire !" });
      }
    })
    .catch((error) =>
      res.status(500).json({ error: "Le commentaire recherché n'existe pas" })
    );
};

//Afficher tous les commentaires d'un post
exports.getComments = (req, res, next) => {
  Comment.findAll({
    where: { postId: req.params.id },
    include: [
      {
        model: User,
      },
    ],
    order: [["createdAt", "DESC"]],
  }) //On récupère le post correspondant à l'id
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(404).json({ error }));
};
