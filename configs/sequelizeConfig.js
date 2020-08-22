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
    database: config.db.name,
    password: config.db.password,
    username: config.db.username,
    host: config.db.host,
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    database: config.db.name,
    password: config.db.password,
    username: config.db.username,
    host: config.db.host,
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    database: config.db.name,
    password: config.db.password,
    username: config.db.username,
    host: config.db.host,
    port: 5432,
    dialect: 'postgres'
  }
}
