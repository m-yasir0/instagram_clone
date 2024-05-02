const res = require('express/lib/response');
const { compareHash, getHash } = require('../libs/helpers/authBcryprHelper');
const sequelizeError = require('../libs/helpers/sequilizeErrorHelper');
const { Users, User_Followers, Posts } = require('../models');
const currentUser = require('../libs/services/getCurrentUserObject');

const CustomError = require('../utilities/customError');
const handledExeption = require('../libs/helpers/handledExeption');
const { uploadFiles } = require('../libs/services/cloudinaryServices');
const getCurrentUserObject = require('../libs/services/getCurrentUserObject');

module.exports = class UserController {
  constructor(user = null) {
    this.user = user;
  }

  async signUp() {
    try {
      return await Users.create(this.user);
    } catch (e) {
      console.log(e);
      let error = sequelizeError(e);
      console.log(error);
      throw new CustomError(error.statusCode, error.errors);
    }
  }

  async signIn(body) {
    if (!body.email || !body.password) {
      throw new CustomError(400, 'email_password_required');
    }
    const user = await Users.findOne({ where: { email: body.email } });
    if (!user || !(await compareHash(body.password, user.password))) {
      throw new CustomError(401, 'login_not_correct');
    } else {
      delete user['password'];
      return user;
    }
  }

  async update(req) {
    try {
      console.log(req.body);
      if (!req.body.currentPassword)
        throw new CustomError(403, 'password_required');
      let user = await currentUser(this.user);
      if (!user) throw new CustomError(404, 'user_not_found');
      if (!(await compareHash(req.body.currentPassword, user.password)))
        throw new CustomError(400, 'password_not_match');

      if (
        req.body.password &&
        req.body.passwordConfirmation == req.body.password
      )
        req.body.password = await getHash(req.body.password);
      else if (req.body.password)
        throw new CustomError(400, 'password_confirmation_not_match');

      let image = [];
      if (req.file) {
        image = await uploadFiles(req.file);
        req.body['profile_picture'] = image[0]
          ? JSON.stringify(image[0])
          : null;
      }
      return await user.update({
        ...req.body,
      });
    } catch (e) {
      handledExeption(e);
    }
  }

  async show(id) {
    try {
      let currentUser = await getCurrentUserObject(this.user);
      let user = await Users.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ['password'],
        },
      });

      let following = await User_Followers.count({
        where: {
          followerId: user.id,
          status: 'approved',
        },
      });

      let followers = await User_Followers.count({
        where: {
          userId: user.id,
          status: 'approved',
        },
      });

      let isFollowed = await User_Followers.findOne({
        where: {
          followerId: currentUser.id,
          userId: user.id,
          status: 'approved',
        },
      });

      let requestSent = await User_Followers.findOne({
        where: {
          followerId: currentUser.id,
          userId: user.id,
          status: 'requested',
        },
      });

      if (!user) {
        throw new CustomError(404, 'user_not_found');
      }

      let posts = [];
      if (
        currentUser.id == user.id ||
        user.user_type == 'public' ||
        isFollowed
      ) {
        posts = await Posts.findAll({
          where: {
            userId: user.id,
          },
        });
      }
      return {
        user,
        followers,
        following,
        requestSent,
        posts,
        isFollowed: isFollowed || user.id == currentUser.id ? true : false,
      };
    } catch (e) {
      console.log(e);
      handledExeption(e);
    }
  }
};
