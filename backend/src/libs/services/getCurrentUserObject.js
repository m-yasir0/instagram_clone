const { Users } = require('../../models');

module.exports = currentUser = (user) => {
  return Users.findByPk(user.id);
};
