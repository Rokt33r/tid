import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  process.env.DB_NAME || 'tid',
  process.env.DB_USERNAME || 'root',
  '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false
  }
)

export default sequelize
