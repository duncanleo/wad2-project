'use strict';

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   **/
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'type', {
      type: Sequelize.ENUM('gamer', 'organiser'),
      allowNull: false,
    });
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   **/
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'type');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_users_type');
  },
};
