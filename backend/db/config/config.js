// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const dbConfig = {
  username: process.env.DB_CONFIG_USERNAME,
  password: process.env.DB_CONFIG_PASSWORD,
  database: process.env.DB_CONFIG_DATABASE,
  host: process.env.DB_CONFIG_HOST,
  dialect: "postgres",
  port: process.env.DB_CONFIG_PORT,
  dialectOptions: {
    define: {
      freezeTableName: true,
    },
  },
};

module.exports = { development: dbConfig, production: dbConfig };
