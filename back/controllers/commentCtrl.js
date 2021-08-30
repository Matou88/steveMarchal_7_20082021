const models   = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils');

// Constants
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT   = 50;

// Routes
module.exports = {
  createComment: function(req, res) {
    // Getting auth header
    const headerAuth  = req.headers['authorization'];
    const userId      = jwtUtils.getUserId(headerAuth);

    // Params
    const content = req.body.content;

    if (content == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (content.length <= CONTENT_LIMIT) {
      return res.status(400).json({ 'error': 'invalid parameters' });
    }

    asyncLib.waterfall([
      function(done) {
        models.Users.findOne({
          where: { id: userId }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if(userFound) {
          models.Comments.create({
            content: content,
            likes  : 0,
            UserId : userFound.id
          })
          .then(function(newComment) {
            done(newComment);
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function(newComment) {
      if (newComment) {
        return res.status(201).json(newComment);
      } else {
        return res.status(500).json({ 'error': 'cannot post Post' });
      }
    });
  },
  listComments: function(req, res) {
    const fields  = req.query.fields;
    const limit   = parseInt(req.query.limit);
    const offset  = parseInt(req.query.offset);
    const order   = req.query.order;

    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }

    models.Comments.findAll({
      order: [(order != null) ? order.split(':') : ['title', 'ASC']],
      attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,
      include: [{
        model: models.Users,
        attributes: [ 'username' ]
      }]
    }).then(function(comments) {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ "error": "no posts found" });
      }
    }).catch(function(err) {
      console.log(err);
      res.status(500).json({ "error": "invalid fields" });
    });
  }
}