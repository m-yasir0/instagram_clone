const CustomError = require('../../utilities/customError');
const sequelizeError = require('./sequilizeErrorHelper');

module.exports = handledException = (e) => {
  let error;
  if (!(e instanceof CustomError)) {
    error = sequelizeError(e);
    console.log(error);
  }
  throw new CustomError(
    error?.statusCode || e.statusCode,
    error?.errors || e.message
  );
};
