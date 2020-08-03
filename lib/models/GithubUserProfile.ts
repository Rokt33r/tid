import { DataTypes, Model } from 'sequelize'
import sequelize from '../sequelize'
import { fixSequelizeModel } from '../db'

interface GithubUserProfileAttributes {
  id: number
  githubToken: string
  githubId: number
  UserId: number
}

interface GithubUserProfileCreationAttributes
  extends Omit<GithubUserProfileAttributes, 'id'> {}

class GithubUserProfile
  extends Model<
    GithubUserProfileAttributes,
    GithubUserProfileCreationAttributes
  >
  implements GithubUserProfileAttributes {
  constructor(...args: any[]) {
    super(...args)
    fixSequelizeModel(new.target, this)
  }

  githubToken: string
  githubId: number
  UserId: number

  readonly id: number
  readonly createdAt: Date
  readonly updatedAt: Date
}

GithubUserProfile.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    githubToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    githubId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    sequelize, // We need to pass the connection instance
    modelName: 'GithubUserProfile', // We need to choose the model name
  }
)

export default GithubUserProfile
