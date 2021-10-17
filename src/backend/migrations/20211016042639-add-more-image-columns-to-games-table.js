'use strict';

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   **/
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('games', 'logo_image', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('games', 'logo_image_license', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('games', 'background_image', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('games', 'background_image_license', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   **/
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('games', 'logo_image');
    await queryInterface.removeColumn('games', 'logo_image_license');
    await queryInterface.removeColumn('games', 'background_image');
    await queryInterface.removeColumn('games', 'background_image_license');
  },
};
