const CustomError = require('../utilities/customError');
var {
  Users,
  Posts,
  User_Followers,
  Comments,
  User_Likes,
} = require('../models');
const handledExeption = require('../libs/helpers/handledExeption');
const currentUser = require('../libs/services/getCurrentUserObject');
const { Op } = require('sequelize');
const authorize = require('../libs/helpers/authorizarionHelpers/authorizationHelper');
const { uploadFiles } = require('../libs/services/cloudinaryServices');

module.exports = class PostController {
  constructor(user = null) {
    this.user = currentUser(user);
  }

  async index() {
    try {
      let user = await this.user;
      let followings = (
        await User_Followers.findAll({
          attributes: ['userId'],
          where: {
            followerId: user.id,
            status: 'approved',
          },
        })
      ).map((val) => val.dataValues.userId);

      return await Posts.findAll({
        order: [['createdAt', 'DESC']],
        where: {
          [Op.or]: [
            {
              userId: {
                [Op.in]: followings,
              },
            },
            {
              userId: user.id,
            },
          ],
        },
        include: [
          {
            model: Users,
            as: 'user',
            attributes: {
              exclude: ['password'],
            },
          },
          {
            model: Users,
            as: 'likedPost',
            attributes: {
              exclude: ['password'],
            },
          },
          {
            model: Comments,
            order: [['createdAt', 'DESC']],
            include: {
              model: Users,
              as: 'user',
            },
          },
        ],
      });
    } catch (e) {
      handledExeption(e);
    }
  }

  async create(req) {
    try {
      let user = await this.user;
      if (!user) {
        throw new CustomError(404, 'unknown_token');
      }

      let images = await uploadFiles(req.files);
      return await user.createPost({
        ...req.body,
        images: images.map((image) => JSON.stringify(image)),
      });
    } catch (e) {
      handledExeption(e);
    }
  }

  async delete(id) {
    try {
      let post = await Posts.findOne({
        where: {
          id,
        },
      });

      await authorize(await this.user, post, 'post', 'destroy');
      await post.destroy();
      return true;
    } catch (e) {
      console.log(e);
      handledExeption(e);
    }
  }

  async update(req) {
    try {
      delete req.body['userId'];
      let post = await Posts.findByPk(req.params.id);

      await authorize(await this.user, post, 'post', 'update');

      if (post.images.length + req.files.length > 10)
        throw new CustomError(400, 'post_images_limit');

      let images = await uploadFiles(req.files);

      post.update({
        ...req.body,
        images: post.images.concat(
          images.map((image) => JSON.stringify(image))
        ),
      });
      return await post.save();
    } catch (e) {
      handledExeption(e);
    }
  }

  async show(id) {
    try {
      let post = await Posts.findByPk(id);
      if (!post) {
        throw new CustomError(404, 'Post not found');
      }
      await authorize(await this.user, post, 'post', 'show');
      return post;
    } catch (e) {
      handledExeption(e);
    }
  }

  async comments(id) {
    try {
      let comments = await Posts.findOne({
        where: {
          id,
        },
        include: {
          model: Comments,
          include: {
            model: Users,
            as: 'user',
            attributes: {
              exclude: ['password'],
            },
          },
        },
      });
      if (!comments) {
        throw new CustomError(404, 'post_not_found');
      }
      await authorize(await this.user, comments, 'post', 'show');
      return comments;
    } catch (e) {
      handledExeption(e);
    }
  }

  async like(id) {
    try {
      var user = await this.user;
      let post = await Posts.findByPk(id);

      if (!post || !user) {
        throw new CustomError(404, 'user_post_not_found');
      }

      await authorize(user, post, 'post', 'show');

      let liked = await User_Likes.create({
        likedById: user.id,
        likedPostId: id,
      });
      return {
        like: true,
        liked: liked,
      };
    } catch (e) {
      if (e.name == 'SequelizeUniqueConstraintError')
        return await this.unlikePost(id, user);
      else console.log(e);
      handledExeption(e);
    }
  }

  async unlikePost(id, user) {
    try {
      let liked = await User_Likes.findOne({
        where: {
          likedById: user.id,
          likedPostId: id,
        },
      });

      await liked.destroy();
      return {
        like: false,
        liked: liked,
      };
    } catch (e) {
      handledExeption(e);
    }
  }
};
