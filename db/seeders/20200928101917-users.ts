// password 123
const password = "$2a$08$QH8mOyYXWR3a1S4gwcjAiesrfNO4R.GrZEE1rlHW5oIgjafinxp0K";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      { email: "123@gmail.com", password },
      { email: "222@gmail.com", password },
      { email: "999@gmail.com", password },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
