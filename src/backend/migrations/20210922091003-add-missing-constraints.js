'use strict';

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   **/
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('places', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('places', 'data', {
      type: Sequelize.JSONB,
      allowNull: false,
    });
    await queryInterface.changeColumn('places', 'remote_id', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    });
    await queryInterface.changeColumn('place_categories', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('place_categories', 'data', {
      type: Sequelize.JSONB,
      allowNull: false,
    });
    await queryInterface.changeColumn('place_categories', 'remote_id', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    });
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   **/
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('places', 'name', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('places', 'data', {
      type: Sequelize.JSONB,
      allowNull: true,
    });
    await queryInterface.changeColumn('places', 'remote_id', {
      type: Sequelize.STRING,
      unique: false,
      allowNull: true,
    });
    await queryInterface.changeColumn('place_categories', 'name', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('place_categories', 'data', {
      type: Sequelize.JSONB,
      allowNull: true,
    });
    await queryInterface.changeColumn('place_categories', 'remote_id', {
      type: Sequelize.STRING,
      unique: false,
      allowNull: true,
    });
  },
};
