'use strict';

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   **/
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    const rows = await queryInterface.sequelize.query(
      `SELECT id FROM users`,
      {
        type: Sequelize.QueryTypes.SELECT,
      },
      { transaction }
    );

    for (const row of rows) {
      console.log('PANDA', row);
      await queryInterface.sequelize.query(
        {
          query: `UPDATE users SET display_name=$name WHERE id=$id`,
          bind: {
            name: Math.random().toString(36).substr(2, 8),
            id: row.id,
          },
        },
        { type: Sequelize.QueryTypes.UPDATE, transaction }
      );
    }

    await queryInterface.changeColumn(
      'users',
      'display_name',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      { transaction }
    );

    try {
      await transaction.commit();
    } catch (e) {
      console.error(e);
      await transaction.rollback();
    }
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   **/
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'display_name', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false,
    });
  },
};
