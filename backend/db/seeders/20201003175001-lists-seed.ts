module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [boards] = await queryInterface.sequelize.query(`SELECT * from boards;`);
    const lists = boards.flatMap((board) =>
      [1, 2, 3].map((ind) => ({ boardId: board.id, name: `${ind}_list` })),
    );
    return queryInterface.bulkInsert("lists", lists);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("lists", null, {});
  },
};
