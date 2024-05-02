'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
      this.belongsTo(models.Posts, { foreignKey: 'PostId', as: 'Post' });
    }
  }
  Comments.init(
    {
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            msg: 'comment_max_length',
            args: [1, 200],
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Comments',
    }
  );
  return Comments;
};
