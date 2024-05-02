const BaseAuthorization = require('./baseAuthorization');
const { Posts, Users, User_Followers } = require('../../../models');
const PostAuthorization = require('./postAuthorization');

module.exports = class CommentAuthorization extends BaseAuthorization {
  constructor(user, comment) {
    super(user, comment);
  }

  async create() {
    return await new PostAuthorization(this.user, this.record).show();
  }

  async update() {
    let post = await Posts.findByPk(this.record.postId);
    return this.user.id == this.record.userId || this.user.id == post.userId;
  }

  async destroy() {
    return await this.update();
  }
};
