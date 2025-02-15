import postgres from "pg";
import { BuildOptions, Model, Sequelize } from "sequelize";

const importConfig = require("../config/config");

const env = process.env.NODE_ENV || "development";
const config = importConfig[env];

// does automatic parse `id` field of model to integer.
// Without it it will be a string which is not convenient
postgres.defaults.parseInt8 = true;

Object.keys(config).forEach((key) => {
  if (process.env[config[key]]) {
    config[key] = process.env[config[key]];
  }
});

const sequelizeOptions = {
  omitNull: true,
  logging: false,
  ...config,
};

let dbConfig = [config.database, config.username, config.password];

if (config.use_env_variable) {
  dbConfig = process.env[config.use_env_variable] as any;
}

export const sequelize = new Sequelize(...dbConfig, sequelizeOptions);

export type IModelStatic<T> = typeof Model & {
  associate(): void;
  new(values?: object, options?: BuildOptions): T;
};
