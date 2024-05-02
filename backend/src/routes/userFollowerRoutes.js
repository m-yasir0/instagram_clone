const express = require('express');
const UserFollowerController = require('../controllers/userFollowerController');
const authenticator = require('../middlewares/authenticationMiddleware');

class UserFollowerRoutes {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.get('/:userId/index', authenticator, async (req, res, next) => {
      try {
        let followings = await new UserFollowerController(req.user).index(
          req.params.userId
        );
        res.status(200).json({
          followings,
        });
      } catch (e) {
        next(e);
      }
    });

    this.router.post(
      '/:userId/create',
      authenticator,
      async (req, res, next) => {
        try {
          await new UserFollowerController(req.user).create(req.params.userId);
          res.status(200).json({
            message: req.t('follow_request_success'),
          });
        } catch (e) {
          next(e);
        }
      }
    );

    this.router.put('/:id/update', authenticator, async (req, res, next) => {
      try {
        let followings = await new UserFollowerController(req.user).update(
          req.params.id
        );
        res.status(200).json({
          followings,
        });
      } catch (e) {
        next(e);
      }
    });

    this.router.delete('/:id/delete', authenticator, async (req, res, next) => {
      try {
        let followings = await new UserFollowerController(req.user).delete(
          req.params.id
        );
        res.status(200).json({
          followings,
        });
      } catch (e) {
        next(e);
      }
    });
  }
}

module.exports = new UserFollowerRoutes().router;
