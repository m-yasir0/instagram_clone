const express = require('express');
const { signToken } = require('../libs/helpers/authenticationHelper');
const UserController = require('../controllers/userController');
const authenticator = require('../middlewares/authenticationMiddleware');
const { rollbackFiles } = require('../libs/helpers/rollBackHelper');
const { multerUploads } = require('../middlewares/multer');

class UserRoutes {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.post('/signup', async (req, res, next) => {
      try {
        let user = (await new UserController(req.body).signUp()).dataValues;
        delete user['password'];
        res.status(201).json({
          email: user.email,
          token: signToken(user),
        });
      } catch (e) {
        next(e);
      }
    });

    this.router.post('/signin', async (req, res, next) => {
      try {
        let user = await new UserController().signIn(req.body);
        res.status(200).json({
          email: user.email,
          token: signToken(user),
        });
      } catch (e) {
        next(e);
      }
    });

    this.router.put(
      '/update',
      authenticator,
      multerUploads.single('profile_picture'),
      async (req, res, next) => {
        try {
          let user = await new UserController(req.user).update(req);
          res.status(200).json(user);
        } catch (e) {
          await rollbackFiles([req.file]);
          next(e);
        }
      }
    );

    this.router.get('/:id/show', authenticator, async (req, res, next) => {
      try {
        let user = await new UserController(req.user).show(req.params.id);
        res.status(200).json({
          user,
        });
      } catch (e) {
        next(e);
      }
    });
  }
}

module.exports = new UserRoutes().router;
