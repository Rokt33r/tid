'use strict'

const userGithubUserProfileConstraintName = 'userGithubUserProfile'
const userDayLogConstraintName = 'userDayLog'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('GithubUserProfile', {
      fields: ['userId'],
      type: 'foreign key',
      name: userGithubUserProfileConstraintName,
      references: {
        table: 'User',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('DayLog', {
      fields: ['userId'],
      type: 'foreign key',
      name: userDayLogConstraintName,
      references: {
        table: 'User',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'GithubUserProfile',
      userGithubUserProfileConstraintName
    )

    await queryInterface.removeConstraint('DayLog', userDayLogConstraintName)
  }
}
