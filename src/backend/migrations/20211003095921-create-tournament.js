'use strict';
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   **/
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tournaments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      region: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      prize_pool: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      banner_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      banner_image_license: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      game_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'games',
          key: 'id',
        },
        allowNull: false,
      },
      start_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      end_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   **/
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tournaments');
  },
};
