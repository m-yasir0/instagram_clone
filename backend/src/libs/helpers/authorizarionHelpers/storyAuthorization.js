const BaseAuthorization = require('./baseAuthorization');
const PostAuthorization = require('./postAuthorization');

module.exports = class StoryAuthorization extends BaseAuthorization {
  constructor(user, story) {
    super(user, story);
  }

  update() {
    return this.user.id == this.record.userId;
  }

  async show() {
    return await new PostAuthorization(this.user, this.record).show();
  }

  destroy() {
    return this.update();
  }
};
