import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../sequelize'
import { fixSequelizeModel } from '../db'

interface DayLogAttributes {
  id: number
  date: string
  title: string
  content: string
  userId: number
}

interface DayLogCreationAttributes extends Omit<DayLogAttributes, 'id'> {}

class DayLog extends Model<DayLogAttributes, DayLogCreationAttributes>
  implements DayLogAttributes {
  constructor(...args: any[]) {
    super(...args)
    fixSequelizeModel(new.target, this)
  }

  public readonly id!: number
  public date!: string
  public title!: string
  public content!: string
  public userId!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

DayLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: true,
    sequelize,
    modelName: 'DayLog'
  }
)

export default DayLog
