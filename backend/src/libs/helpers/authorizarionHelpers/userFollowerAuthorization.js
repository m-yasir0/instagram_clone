const BaseAuthorization = require('./baseAuthorization');

module.exports = class UserFollowerAuthorization extends BaseAuthorization {
  constructor(user, following) {
    super(user, following);
  }

  update() {
    return this.user.id == this.record.userId;
  }

  index() {
    return (
      this.update() ||
      (this.record.followerId == this.user.id &&
        this.record.status == 'approved')
    );
  }

  destroy() {
    return this.update() || this.record.followerId == this.user.id;
  }
};
