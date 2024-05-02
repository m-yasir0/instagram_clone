const CustomError = require('../utilities/customError');
var { Users, User_Followers } = require('../models');
const handledExeption = require('../libs/helpers/handledExeption');
const currentUser = require('../libs/services/getCurrentUserObject');
const authorize = require('../libs/helpers/authorizarionHelpers/authorizationHelper');
const { Op } = require('sequelize');

module.exports = class UserFollowerController {
  constructor(user = null) {
    this.user = currentUser(user);
  }

  async index(userId) {
    try {
      let currentUser = await this.user;
      let followingUser = await Users.findByPk(userId);

      if (!currentUser || !followingUser) {
        throw new CustomError(404, 'user_not_found');
      }

      let followers = await User_Followers.findAll({
        where: {
          userId: followingUser.id,
          status:
            currentUser.id === followingUser.id
              ? { [Op.in]: ['approved', 'requested'] }
              : 'approved',
        },
        include: {
          model: Users,
          as: 'follower',
          attributes: {
            exclude: ['password'],
          },
        },
      });

      let following = await User_Followers.findAll({
        where: {
          followerId: followingUser.id,
          status:
            currentUser.id === followingUser.id
              ? { [Op.in]: ['approved', 'requested'] }
              : 'approved',
        },
        include: {
          model: Users,
          as: 'user',
          attributes: {
            exclude: ['password'],
          },
        },
      });
      return {
        followers,
        following,
      };
    } catch (e) {
      console.log(e);
      handledExeption(e);
    }
  }

  async create(userId) {
    try {
      let currentUser = await this.user;
      let followingUser = await Users.findByPk(userId);

      if (!currentUser || !followingUser) {
        throw new CustomError(404, 'User not found');
      }

      let following = await User_Followers.create({
        userId: followingUser.id,
        followerId: currentUser.id,
        status: followingUser.user_type === 'public' ? 'approved' : 'requested',
      });
      return true;
    } catch (e) {
      console.log(e);
      handledExeption(e);
    }
  }

  async update(id) {
    try {
      let following = await User_Followers.findByPk(id);

      if (!following) throw new CustomError(404, 'following_not_found');

      await authorize(await this.user, following, 'following', 'update');
      following.status = 'approved';
      await following.save();
      return following;
    } catch (e) {
      handledExeption(e);
    }
  }

  async delete(id) {
    try {
      let following = await User_Followers.findByPk(id);

      await authorize(await this.user, following, 'following', 'destroy');
      following.destroy();
      return following;
    } catch (e) {
      console.log(e);
      handledExeption(e);
    }
  }
};
