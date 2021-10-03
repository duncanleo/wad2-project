'use strict';

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   **/
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tournaments', 'owner_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
    });
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   **/
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tournaments', 'owner_id');
  },
};
