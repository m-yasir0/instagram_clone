var { Users, Stories, User_Followers } = require('../models');
const handledExeption = require('../libs/helpers/handledExeption');
const currentUser = require('../libs/services/getCurrentUserObject');
const { Op } = require('sequelize');
const CustomError = require('../utilities/customError');
const authorize = require('../libs/helpers/authorizarionHelpers/authorizationHelper');
const { uploadFiles } = require('../libs/services/cloudinaryServices');

module.exports = class StoryController {
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

      return await Stories.findAll({
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
        include: {
          model: Users,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
      });
    } catch (e) {
      console.log(e);
      handledExeption(e);
    }
  }

  async create(req) {
    try {
      let user = await this.user;
      if (!user) {
        throw new CustomError(404, 'unknown_token');
      }

      let image = [];
      if (req.file) image = await uploadFiles(req.file);

      let story = await user.createStory({
        ...req.body,
        image: image[0] ? JSON.stringify(image[0]) : null,
      });

      return await Stories.findOne({
        where: { id: story.id },
        include: {
          model: Users,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
      });
    } catch (e) {
      console.log(e);
      handledExeption(e);
    }
  }

  async delete(id) {
    try {
      let story = await Stories.findByPk(id);

      await authorize(await this.user, story, 'story', 'destroy');
      story.destroy();
      return true;
    } catch (e) {
      handledExeption(e);
    }
  }

  async update(req) {
    try {
      delete req.body['userId'];
      let story = await Stories.findByPk(req.params.id);

      await authorize(await this.user, story, 'story', 'update');
      story.update(req.body);
      return await story.save();
    } catch (e) {
      console.log(e);
      handledExeption(e);
    }
  }

  async show(id) {
    try {
      let story = await Stories.findByPk(id);
      if (!story) {
        throw new CustomError(404, 'story_not_found');
      }

      await authorize(await this.user, story, 'story', 'show');
      return story;
    } catch (e) {
      handledExeption(e);
    }
  }
};
