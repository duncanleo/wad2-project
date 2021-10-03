'use strict';

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   **/
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('memberships', 'role', {
      type: Sequelize.ENUM('leader', 'member'),
      allowNull: false,
      defaultValue: 'member',
    });
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   **/
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('memberships', 'role');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS enum_memberships_role'
    );
  },
};
