import { Sequelize } from 'sequelize'
import config from '../configs/config'

const sequelize = new Sequelize(
  config.db.name,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: 'postgres',
    logging: false
  }
)

export default sequelize
