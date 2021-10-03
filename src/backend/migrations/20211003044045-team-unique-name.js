'use strict';

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   **/
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('teams', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   **/
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('teams', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    });
  },
};
