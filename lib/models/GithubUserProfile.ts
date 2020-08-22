import { DataTypes, Model } from 'sequelize'
import sequelize from '../sequelize'
import { fixSequelizeModel } from '../db'

interface GithubUserProfileAttributes {
  id: number
  githubToken: string
  githubId: string
  userId: number
}

interface GihubUserProfileCreationAttributes
  extends Omit<GithubUserProfileAttributes, 'id'> {}

class GithubUserProfile
  extends Model<GithubUserProfileAttributes, GihubUserProfileCreationAttributes>
  implements GithubUserProfileAttributes {
  constructor(...args: any[]) {
    super(...args)
    fixSequelizeModel(new.target, this)
  }

  public readonly id!: number
  public githubToken!: string
  public githubId!: string
  public userId!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

GithubUserProfile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    githubToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    githubId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    timestamps: true,
    sequelize,
    modelName: 'GithubUserProfile',
    freezeTableName: true
  }
)

export default GithubUserProfile
