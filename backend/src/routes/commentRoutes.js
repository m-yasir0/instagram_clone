const express = require('express');
const CommentController = require('../controllers/commentController');
const authenticator = require('../middlewares/authenticationMiddleware');

class CommentRoutes {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.post(
      '/:postId/create',
      authenticator,
      async (req, res, next) => {
        try {
          let comment = await new CommentController(req.user).create(
            req.body,
            req.params.postId
          );
          res.status(200).json({
            comment,
          });
        } catch (e) {
          next(e);
        }
      }
    );

    this.router.put(
      '/:commentId/update',
      authenticator,
      async (req, res, next) => {
        try {
          let comment = await new CommentController(req.user).update(
            req.body,
            req.params.commentId
          );
          res.status(200).json({
            comment,
          });
        } catch (e) {
          next(e);
        }
      }
    );

    this.router.delete('/:id/delete', authenticator, async (req, res, next) => {
      try {
        await new CommentController(req.user).delete(req.params.id);
        res.status(200).json({
          message: req.t('comment_delete_success'),
        });
      } catch (e) {
        next(e);
      }
    });
  }
}

module.exports = new CommentRoutes().router;
