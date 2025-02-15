"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      "users",
      "avatar",
      {
        type: Sequelize.STRING,
      },
    ),
  ]),

  down: async (queryInterface, Sequelize) => Promise.all([queryInterface.removeColumn("users", "avatar")]),
};
