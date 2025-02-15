import { sequelize } from "..";
import { db } from "./models";

export const connectDB = (): Promise<void> => {
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return sequelize.authenticate();
};
