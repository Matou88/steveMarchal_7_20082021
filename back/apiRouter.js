// Imports
const express = require('express');
const usersCtrl = require('./controllers/userCtrl');
const postCtrl = require('./controllers/postCtrl');
const likesPostCtrl = require('./controllers/postLikeCtrl');
const commentCtrl = require('./controllers/commentCtrl');
const likesCommentCtrl = require('./controllers/commentLikeCtrl');


// Router
exports.router = (function() {
  const apiRouter = express.Router();


  apiRouter.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, client-security-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
  });

  // Users routes
  apiRouter.route('/users/signup/').post(usersCtrl.signup);
  apiRouter.route('/users/login/').post(usersCtrl.login);
  apiRouter.route('/users/me/').get(usersCtrl.getUserProfile);
  apiRouter.route('/users/me/').put(usersCtrl.updateUserProfile);
  apiRouter.route('/users/me/').post(usersCtrl.getUserProfile);
  apiRouter.route('/users/me/').delete(usersCtrl.deleteUserProfile);

  // Messages routes
  apiRouter.route('/posts/new/').post(postCtrl.createPost);
  apiRouter.route('/posts/').get(postCtrl.listPosts);

  //Comments routes
  apiRouter.route('/comment/').post(commentCtrl.createComment);
  apiRouter.route('/comment/').get(commentCtrl.listComments);

  // Likes
  apiRouter.route('/messages/:messageId/vote/like').post(likesPostCtrl.likePost);
  apiRouter.route('/messages/:messageId/vote/dislike').post(likesPostCtrl.dislikePost);
  apiRouter.route('/comments/:commentId/vote/like').post(likesCommentCtrl.likeComment);
  apiRouter.route('/comments/:commentId/vote/dislike').post(likesCommentCtrl.dislikeComment);

  return apiRouter;
})();