require('dotenv').config();

const development = production = {
  username: process.env.DB_CONFIG_USERNAME,
  password: process.env.DB_CONFIG_PASSWORD,
  database: process.env.DB_CONFIG_DATABASE,
  host: process.env.DB_CONFIG_HOST,
  dialect: "postgres",
  port: "5432",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
    define: {
      freezeTableName: true,
    },
  },
};

module.exports = { development, production };
