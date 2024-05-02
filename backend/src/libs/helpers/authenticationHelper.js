var jwt = require('jsonwebtoken');

const signToken = (authUser) => {
  return jwt.sign(JSON.stringify(authUser), process.env.TOKEN_KEY);
};

module.exports = { signToken };
