import Post from '../lib/models/Post'
import User from '../lib/models/User'

async function run() {
  await Post.sync()
  await User.sync()
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
