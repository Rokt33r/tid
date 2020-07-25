import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../sequelize'
import { fixSequelizeModel } from '../db'

interface PostAttributes {
  title: string
  content: string
}

class Post extends Model<PostAttributes> implements PostAttributes {
  constructor(...args: any[]) {
    super(...args)
    fixSequelizeModel(new.target, this)
  }

  title: string
  content: string

  readonly id: number
  readonly createdAt: Date
  readonly updatedAt: Date
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
