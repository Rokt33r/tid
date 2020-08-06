import Post from './Post'
import User from './User'
import GithubUserProfile from './GithubUserProfile'

User.hasOne(GithubUserProfile)
GithubUserProfile.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
})

export { Post, User, GithubUserProfile }
