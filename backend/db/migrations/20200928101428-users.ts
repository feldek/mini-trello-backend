module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query("CREATE EXTENSION \"uuid-ossp\";");

    return queryInterface.createTable(
      "users",
      {
        id: {
          primaryKey: true,
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.literal("uuid_generate_v4()"),
          allowNull: false,
        },
        email: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        confirm: {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        updatedAt: Sequelize.DataTypes.DATE,
        createdAt: Sequelize.DataTypes.DATE,
      },
    );
  },

  down: async (queryInterface, Sequelize) => queryInterface.dropTable("users"),
};
