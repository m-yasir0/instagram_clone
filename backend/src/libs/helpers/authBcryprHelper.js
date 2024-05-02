const crypt = require('bcrypt');
const { SALT_ROUNDS } = require('../../utilities/appConstants');

const getHash = (plain) => {
  return crypt.hash(plain, SALT_ROUNDS);
};

const compareHash = (plain, hashed) => {
  return crypt.compare(plain, hashed);
};
module.exports = { getHash, compareHash };
