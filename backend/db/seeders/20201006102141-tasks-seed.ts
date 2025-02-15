module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [lists] = await queryInterface.sequelize.query("SELECT * from lists;");
    const orderStep = 1000000;
    const tasks = lists.flatMap(
      (list) =>
        [1, 2, 3, 4, 5].map((ind) => ({
          listId: list.id,
          name: `${ind}_task`,
          order: (ind - 1) * orderStep,
        })),
    );

    return queryInterface.bulkInsert("tasks", tasks);
  },

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete("tasks", null, {}),
};
