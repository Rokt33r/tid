import { User, GithubUserProfile, Post } from '../lib/models'

async function syncDb() {
  await User.sync()
  await GithubUserProfile.sync()
  await Post.sync()
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
