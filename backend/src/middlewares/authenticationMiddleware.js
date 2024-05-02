var jwt = require('jsonwebtoken');
let CustomError = require('../utilities/customError');

/**
 * Middleware for user auth
 * Verifies the token in header and create user session
 * create error for unverified token
 * Scheme Bearer
 */
var authenticator = (req, res, next) => {
  var token =
    req.body.token ||
    req.query.token ||
    req.headers['authorization']?.split(' ')[1];
  if (!token) {
    let err = new CustomError(403, 'user_token_required');
    next(err);
  } else {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      err = new CustomError(401, 'unknown_token');
      next(err);
    }
  }
  next();
};

module.exports = authenticator;
