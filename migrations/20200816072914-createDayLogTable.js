'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('DayLog', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      date: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DayLog')
  }
}
