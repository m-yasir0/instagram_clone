const express = require('express');
const PostController = require('../controllers/postController');
const authenticator = require('../middlewares/authenticationMiddleware');
const { rollbackFiles } = require('../libs/helpers/rollBackHelper');
const { multerUploads } = require('../middlewares/multer');

class PostRoutes {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.get('/', authenticator, async (req, res, next) => {
      try {
        let posts = await new PostController(req.user).index();
        res.status(200).json({
          posts,
        });
      } catch (e) {
        next(e);
      }
    });

    this.router.get('/:id/show', authenticator, async (req, res, next) => {
      try {
        let post = await new PostController(req.user).show(req.params.id);
        res.status(200).json({
          post,
        });
      } catch (e) {
        next(e);
      }
    });

    this.router.post(
      '/create',
      authenticator,
      multerUploads.array('images', 10),
      async (req, res, next) => {
        try {
          let post = await new PostController(req.user).create(req);
          res.status(201).json({
            post: post.dataValues,
          });
        } catch (e) {
          await rollbackFiles(req.files);
          next(e);
        }
      }
    );

    this.router.delete('/:id/delete', authenticator, async (req, res, next) => {
      try {
        await new PostController(req.user).delete(req.params.id);
        res.status(200).json({
          message: req.t('post_delete_success'),
        });
      } catch (e) {
        next(e);
      }
    });

    this.router.put(
      '/:id/update',
      authenticator,
      multerUploads.array('images', 10),
      async (req, res, next) => {
        try {
          let post = await new PostController(req.user).update(req);
          console.log(post);
          res.status(200).json({
            post,
          });
        } catch (e) {
          await rollbackFiles(req.files);
          next(e);
        }
      }
    );

    this.router.get('/:id/comments', authenticator, async (req, res, next) => {
      try {
        let comments = await new PostController(req.user).comments(
          req.params.id
        );
        res.status(200).json({
          comments,
        });
      } catch (e) {
        next(e);
      }
    });

    this.router.post('/:id/like', authenticator, async (req, res, next) => {
      try {
        let like = await new PostController(req.user).like(req.params.id);
        res.status(200).json({
          like,
        });
      } catch (e) {
        next(e);
      }
    });
  }
}

module.exports = new PostRoutes().router;
