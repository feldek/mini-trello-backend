// password 123
const password = "$2a$08$QH8mOyYXWR3a1S4gwcjAiesrfNO4R.GrZEE1rlHW5oIgjafinxp0K";

module.exports = {
  up: (queryInterface, _Sequelize) => queryInterface.bulkInsert(
    "users",
    [
      { email: "123@gmail.com", password },
      { email: "222@gmail.com", password },
      { email: "999@gmail.com", password },
    ],
  ),

  down: (queryInterface, _Sequelize) => queryInterface.bulkDelete("users", null, {}),
};
