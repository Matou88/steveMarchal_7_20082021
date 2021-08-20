const models   = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const asyncLib = require('async');

// Constants
const DISLIKED = 0;
const LIKED    = 1;

// Routes
module.exports = {
  likeComment: function(req, res) {
    // Getting auth header
    const headerAuth  = req.headers['authorization'];
    const userId      = jwtUtils.getUserId(headerAuth);

    // Params
    const commentId = parseInt(req.params.commentId);

    if (commentId <= 0) {
      return res.status(400).json({ 'error': 'invalid parameters' });
    }

    asyncLib.waterfall([
      function(done) {
        models.Comments.findOne({
          where: { id: commentId }
        })
        .then(function(commentFound) {
          done(null, commentFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify comment' });
        });
      },
      function(commentFound, done) {
        if(commentFound) {
          models.Users.findOne({
            where: { id: userId }
          })
          .then(function(userFound) {
            done(null, commentFound, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
        } else {
          res.status(404).json({ 'error': 'comment already liked' });
        }
      },
      function(commentFound, userFound, done) {
        if(userFound) {
          models.commentLike.findOne({
            where: {
              userId: userId,
              commentId: commentId
            }
          })
          .then(function(userAlreadyLikedFound) {
            done(null, commentFound, userFound, userAlreadyLikedFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify is user already liked' });
          });
        } else {
          res.status(404).json({ 'error': 'user not exist' });
        }
      },
      function(commentFound, userFound, userAlreadyLikedFound, done) {
        if(!userAlreadyLikedFound) {
          commentFound.addUser(userFound, { isLike: LIKED })
          .then(function (alreadyLikeFound) {
            done(null, commentFound, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to set user reaction' });
          });
        } else {
          if (userAlreadyLikedFound.isLike === DISLIKED) {
            userAlreadyLikedFound.update({
              isLike: LIKED,
            }).then(function() {
              done(null, commentFound, userFound);
            }).catch(function(err) {
              res.status(500).json({ 'error': 'cannot update user reaction' });
            });
          } else {
            res.status(409).json({ 'error': 'comment already liked' });
          }
        }
      },
      function(commentFound, userFound, done) {
        commentFound.update({
          likes: commentFound.likes + 1,
        }).then(function() {
          done(commentFound);
        }).catch(function(err) {
          res.status(500).json({ 'error': 'cannot update comment like counter' });
        });
      },
    ], function(commentFound) {
      if (commentFound) {
        return res.status(201).json(commentFound);
      } else {
        return res.status(500).json({ 'error': 'cannot update comment' });
      }
    });
  },
  dislikeComment: function(req, res) {
   // Getting auth header
   const headerAuth  = req.headers['authorization'];
   const userId      = jwtUtils.getUserId(headerAuth);

   // Params
   const commentId = parseInt(req.params.commentId);

   if (commentId <= 0) {
     return res.status(400).json({ 'error': 'invalid parameters' });
   }

   asyncLib.waterfall([
    function(done) {
       models.Comments.findOne({
         where: { id: commentId }
       })
       .then(function(commentFound) {
         done(null, commentFound);
       })
       .catch(function(err) {
         return res.status(500).json({ 'error': 'unable to verify comment' });
       });
     },
     function(commentFound, done) {
       if(commentFound) {
         models.Users.findOne({
           where: { id: userId }
         })
         .then(function(userFound) {
           done(null, commentFound, userFound);
         })
         .catch(function(err) {
           return res.status(500).json({ 'error': 'unable to verify user' });
         });
       } else {
         res.status(404).json({ 'error': 'comment already liked' });
       }
     },
     function(commentFound, userFound, done) {
       if(userFound) {
         models.commentLike.findOne({
           where: {
             userId: userId,
             commentId: commentId
           }
         })
         .then(function(userAlreadyLikedFound) {
            done(null, commentFound, userFound, userAlreadyLikedFound);
         })
         .catch(function(err) {
           return res.status(500).json({ 'error': 'unable to verify is user already liked' });
         });
       } else {
         res.status(404).json({ 'error': 'user not exist' });
       }
     },
     function(commentFound, userFound, userAlreadyLikedFound, done) {
      if(!userAlreadyLikedFound) {
        commentFound.addUser(userFound, { isLike: DISLIKED })
        .then(function (alreadyLikeFound) {
          done(null, commentFound, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to set user reaction' });
        });
      } else {
        if (userAlreadyLikedFound.isLike === LIKED) {
          userAlreadyLikedFound.update({
            isLike: DISLIKED,
          }).then(function() {
            done(null, commentFound, userFound);
          }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot update user reaction' });
          });
        } else {
          res.status(409).json({ 'error': 'comment already disliked' });
        }
      }
     },
     function(commentFound, userFound, done) {
       commentFound.update({
         likes: commentFound.likes - 1,
       }).then(function() {
         done(commentFound);
       }).catch(function(err) {
         res.status(500).json({ 'error': 'cannot update comment like counter' });
       });
     },
   ], function(commentFound) {
     if (commentFound) {
       return res.status(201).json(commentFound);
     } else {
       return res.status(500).json({ 'error': 'cannot update comment' });
     }
   });
  }
}