import { DataTypes, Model } from 'sequelize'
import sequelize from '../sequelize'

class Post extends Model {
  title: string
  content: string
}

Post.init(
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize, // We need to pass the connection instance
    modelName: 'Post', // We need to choose the model name
  }
)

export default Post
