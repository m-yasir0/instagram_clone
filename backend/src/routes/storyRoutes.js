const express = require('express');
const authenticator = require('../middlewares/authenticationMiddleware');
const { rollbackFiles } = require('../libs/helpers/rollBackHelper');
const StoryController = require('../controllers/storyController');
const { multerUploads } = require('../middlewares/multer');

class StoryRoutes {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.get('/', authenticator, async (req, res, next) => {
      try {
        let stories = await new StoryController(req.user).index();
        res.status(200).json({
          stories,
        });
      } catch (e) {
        next(e);
      }
    });

    this.router.get('/:id/show', authenticator, async (req, res, next) => {
      try {
        let story = await new StoryController(req.user).show(req.params.id);
        res.status(200).json({
          story,
        });
      } catch (e) {
        next(e);
      }
    });

    this.router.post(
      '/create',
      authenticator,
      multerUploads.single('image'),
      async (req, res, next) => {
        try {
          let story = await new StoryController(req.user).create(req);
          res.status(201).json({
            story,
          });
        } catch (e) {
          await rollbackFiles(req.files);
          next(e);
        }
      }
    );

    this.router.delete('/:id/delete', authenticator, async (req, res, next) => {
      try {
        await new StoryController(req.user).delete(req.params.id);
        res.status(200).json({
          message: req.t('story_delete_success'),
        });
      } catch (e) {
        next(e);
      }
    });

    this.router.put(
      '/:id/update',
      authenticator,
      multerUploads.single('image'),
      async (req, res, next) => {
        try {
          let story = await new StoryController(req.user).update(req);
          res.status(200).json({
            story,
          });
        } catch (e) {
          await rollbackFiles(req.files);
          next(e);
        }
      }
    );
  }
}

module.exports = new StoryRoutes().router;
