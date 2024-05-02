'use strict';
const { Model } = require('sequelize');
const CustomError = require('../utilities/customError');
module.exports = (sequelize, DataTypes) => {
  class Stories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
    }
  }
  Stories.init(
    {
      content: {
        type: DataTypes.STRING,
        validate: {
          len: {
            msg: 'story_content_max_length',
            args: [0, 200],
          },
        },
      },
      image: {
        type: DataTypes.TEXT('long'),
      },
    },
    {
      hooks: {
        beforeCreate: (story) => {
          if (!story.image && !story.content) {
            throw new CustomError(400, 'empty_story_error');
          }
        },
      },
      sequelize,
      modelName: 'Stories',
    }
  );
  return Stories;
};
