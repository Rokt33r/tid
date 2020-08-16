export default {
  github: {
    clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  },
  db: {
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    host: process.env.DB_HOST
  }
}
