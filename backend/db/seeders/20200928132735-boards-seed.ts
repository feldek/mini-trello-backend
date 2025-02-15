module.exports = {
  up: async (queryInterface) => {
    const [users] = await queryInterface.sequelize.query("SELECT * from users;");
    const boards = users.flatMap(
      (user) =>
        [1, 2, 3].map((ind) => ({ userId: user.id, name: `${ind}_board` })),
    );

    return queryInterface.bulkInsert("boards", boards);
  },

  down: async (queryInterface) => queryInterface.bulkDelete("boards", null, {}),
};
