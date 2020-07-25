import { DataTypes, Model } from 'sequelize'
import sequelize from '../sequelize'
import { fixSequelizeModel } from '../db'

interface UserAttributes {
  name: string
  githubToken: string
  githubId: string
}

class User extends Model<UserAttributes> implements UserAttributes {
  constructor(...args: any[]) {
    super(...args)
    fixSequelizeModel(new.target, this)
  }

  name: string
  githubToken: string
  githubId: string

  readonly id: number
  readonly createdAt: Date
  readonly updatedAt: Date
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    githubToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    githubId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
  }
)

export default User
