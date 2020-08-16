const config = {
  db: {
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    host: process.env.DB_HOST
  }
}

module.exports = {
  development: {
    name: config.db.name,
    password: config.db.password,
    username: config.db.username,
    host: config.db.host,
    dialect: 'postgres'
  },
  production: {
    name: config.db.name,
    password: config.db.password,
    username: config.db.username,
    host: config.db.host,
    dialect: 'postgres'
  },
  test: {
    name: config.db.name,
    password: config.db.password,
    username: config.db.username,
    host: config.db.host,
    dialect: 'postgres'
  }
}
