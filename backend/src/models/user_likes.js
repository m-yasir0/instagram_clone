'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { as: 'likedBy', onDelete: 'CASCADE' });
      this.belongsTo(models.Posts, { as: 'likedPost', onDelete: 'CASCADE' });
    }
  }
  User_Likes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['likedById', 'likedPostId'],
        },
      ],
      sequelize,
      modelName: 'User_Likes',
    }
  );
  return User_Likes;
};
