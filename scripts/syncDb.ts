import { Post, User, GithubUserProfile } from '../lib/models'

async function run() {
  await Post.sync()
  await User.sync()
  await GithubUserProfile.sync()
}

run()
  .then(() => {
    console.log('Synced!')
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
