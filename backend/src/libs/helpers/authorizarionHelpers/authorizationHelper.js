const CustomError = require('../../../utilities/customError');
const CommentAuthorization = require('./commentAuthorization');
const PostAuthorization = require('./postAuthorization');
const StoryAuthorization = require('./storyAuthorization');
const UserFollowerAuthorization = require('./userFollowerAuthorization');

mappedClassesToStrings = {
  post: PostAuthorization,
  comment: CommentAuthorization,
  story: StoryAuthorization,
  following: UserFollowerAuthorization,
};

module.exports = async function authorize(
  user,
  record,
  controllerClass,
  action
) {
  if (
    !(await new mappedClassesToStrings[controllerClass](user, record)[action]())
  )
    throw new CustomError(403, 'user_not_authorized');
};
