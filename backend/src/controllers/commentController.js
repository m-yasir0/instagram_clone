const CustomError = require('../utilities/customError');
var { Posts, Comments } = require('../models');
const handledExeption = require('../libs/helpers/handledExeption');
const currentUser = require('../libs/services/getCurrentUserObject');
const authorize = require('../libs/helpers/authorizarionHelpers/authorizationHelper');

module.exports = class CommentController {
  constructor(user = null) {
    this.user = currentUser(user);
  }

  async create(comment, postId) {
    try {
      let user = await this.user;
      let post = await Posts.findByPk(postId);

      if (!user || !post) {
        throw new CustomError(404, 'user_post_not_found');
      }

      await authorize(user, post, 'post', 'show');
      comment['userId'] = user.id;
      comment['postId'] = post.id;
      return await post.createComment(comment);
    } catch (e) {
      handledExeption(e);
    }
  }

  async update(body, commentId) {
    try {
      delete body['userId'];
      delete body['postId'];
      let comment = await Comments.findByPk(commentId);

      await authorize(await this.user, comment, 'comment', 'update');
      comment.update(body);
      return await comment.save();
    } catch (e) {
      handledExeption(e);
    }
  }

  async delete(id) {
    try {
      let comment = await Comments.findByPk(id);
      if (!comment) throw new CustomError(404, 'comment_not_found');

      await authorize(await this.user, comment, 'comment', 'destroy');
      await comment.destroy();
      return true;
    } catch (e) {
      handledExeption(e);
    }
  }
};
