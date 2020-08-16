import User from './User'
import GithubUserProfile from './GithubUserProfile'
import DayLog from './DayLog'

const UserGithubUserProfileOptions = {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
}

User.hasOne(GithubUserProfile, UserGithubUserProfileOptions)
GithubUserProfile.belongsTo(User, UserGithubUserProfileOptions)

const UserDayLogOptions = {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
}

User.hasMany(DayLog, UserDayLogOptions)
DayLog.belongsTo(User, UserDayLogOptions)

export { User, GithubUserProfile, DayLog }
