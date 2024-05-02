const BaseAuthorization = require('./baseAuthorization');
const { User_Followers } = require('../../../models');

module.exports = class PostAuthorization extends BaseAuthorization {
  constructor(user, post) {
    super(user, post);
  }

  update() {
    return this.user.id == this.record.userId;
  }

  async show() {
    if (this.user.id == this.record.userId || this.user.user_type == 'public')
      return true;

    return (await User_Followers.findOne({
      where: {
        userId: this.record.userId,
        followerId: this.user.id,
        status: 'approved',
      },
    })) == null
      ? false
      : true;
  }

  destroy() {
    return this.update();
  }
};
