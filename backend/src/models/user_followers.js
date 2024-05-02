'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Followers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Users, {
        foreignKey: 'followerId',
        as: 'follower',
        onDelete: 'CASCADE',
      });
    }
  }
  User_Followers.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'requested',
        validate: {
          isIn: [['requested', 'approved']],
        },
      },
    },
    {
      sequelize,
      modelName: 'User_Followers',
    }
  );
  return User_Followers;
};
