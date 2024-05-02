'use strict';
const { Model } = require('sequelize');
const { getHash } = require('../libs/helpers/authBcryprHelper');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(Users, {
        through: 'User_Followers',
        as: 'follower',
        foreignKey: 'followerId',
      });
      this.belongsToMany(Users, {
        through: 'User_Followers',
        as: 'user',
        foreignKey: 'userId',
      });
      this.hasMany(models.Posts, { foreignKey: 'userId' });
      this.hasMany(models.Stories, { foreignKey: 'userId' });
      this.belongsToMany(models.Posts, {
        through: 'User_Likes',
        as: 'likedBy',
        foreignKey: 'likedById',
      });
      this.hasMany(models.Comments, { foreignKey: 'userId' });
    }
  }
  Users.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: {
            msg: 'password_length',
            args: [6],
          },
        },
      },
      user_type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'public',
        validate: {
          notEmpty: true,
        },
      },
      profile_picture: DataTypes.TEXT('long'),
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          user.password = await getHash(user.password);
        },
      },
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
