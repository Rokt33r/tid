import User from './User'
import GithubUserProfile from './GithubUserProfile'
import Post from './Post'

User.hasOne(GithubUserProfile)
GithubUserProfile.belongsTo(User)

export { User, GithubUserProfile, Post }
