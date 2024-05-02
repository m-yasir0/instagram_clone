const errorType = (e) => {
  return e.name;
};

const mappedMessages = (errors) => {
  return errors.map((val) => {
    return val.message;
  });
};

const sequelizeError = (e) => {
  switch (errorType(e)) {
    case 'SequelizeValidationError':
      return {
        statusCode: 400,
        errors: mappedMessages(e.errors),
      };
    case 'SequelizeUniqueConstraintError':
      return {
        statusCode: 409,
        errors: mappedMessages(e.errors),
      };

    default:
      return {
        statusCode: 500,
        errors: 'server_error',
      };
  }
};
module.exports = sequelizeError;
