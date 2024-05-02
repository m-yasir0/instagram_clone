'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
      this.belongsToMany(models.Users, {
        through: 'User_Likes',
        as: 'likedPost',
        foreignKey: 'likedPostId',
      });
      this.hasMany(models.Comments, {
        foreignKey: 'PostId',
        onDelete: 'CASCADE',
      });
    }
  }
  Posts.init(
    {
      content: {
        type: DataTypes.STRING,
        validate: {
          len: {
            msg: 'post_content_max_length',
            args: [0, 200],
          },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            msg: 'post_title_max_length',
            args: [0, 100],
          },
        },
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.TEXT('long')),
        validate: {
          isSpecificLength(value) {
            if (value.length > 10) {
              throw new Error('post_images_limit');
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Posts',
    }
  );
  return Posts;
};
