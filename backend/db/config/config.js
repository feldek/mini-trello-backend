// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

console.log(process.env.DB_CONFIG_USERNAME);
module.exports = {
  development: {
    username: process.env.DB_CONFIG_USERNAME,
    password: process.env.DB_CONFIG_PASSWORD,
    database: process.env.DB_CONFIG_DATABASE,
    host: process.env.DB_CONFIG_HOST,
    dialect: "postgres",
    port: process.env.DB_CONFIG_PORT,
    dialectOptions: {
      // ssl: {
      //   rejectUnauthorized: false,
      // },
      define: {
        freezeTableName: true,
      },
    },
  },
  production: {
    username: process.env.DB_CONFIG_USERNAME,
    password: process.env.DB_CONFIG_PASSWORD,
    database: process.env.DB_CONFIG_DATABASE,
    host: process.env.DB_CONFIG_HOST,
    dialect: "postgres",
    port: process.env.DB_CONFIG_PORT,
    dialectOptions: {
      // ssl: {
      //   rejectUnauthorized: false,
      // },
      define: {
        freezeTableName: true,
      },
    },
  },
};
