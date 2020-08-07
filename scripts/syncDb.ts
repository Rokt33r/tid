import { User, GithubUserProfile, DayLog } from '../lib/models'

async function syncDb() {
  await User.sync({ force: true })
  await GithubUserProfile.sync({ force: true })
  await DayLog.sync({ force: true })
}

syncDb()
  .then(() => {
    console.log('Synced!')
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
