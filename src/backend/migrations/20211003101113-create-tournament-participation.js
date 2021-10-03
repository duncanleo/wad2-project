'use strict';
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   **/
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'tournament_participations',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        tournament_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'tournaments',
            key: 'id',
          },
          allowNull: false,
        },
        team_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'teams',
            key: 'id',
          },
          allowNull: false,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        uniqueKeys: {
          tournament_participations_unique: {
            fields: ['tournament_id', 'team_id'],
          },
        },
      }
    );
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   **/
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tournament_participations');
  },
};

