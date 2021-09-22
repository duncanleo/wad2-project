'use strict';
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   **/
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'place_place_categories',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        place_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'places',
            key: 'id',
          },
          unique: true,
          allowNull: false,
        },
        place_category_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'place_categories',
            key: 'id',
          },
          unique: true,
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
          unique_place_and_category: {
            fields: ['place_id', 'place_category_id'],
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
    await queryInterface.dropTable('place_place_categories');
  },
};
