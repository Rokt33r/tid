import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('tid', 'root', '', {
  host: 'localhost',
  dialect: 'postgres',
})

export default sequelize
