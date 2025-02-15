import { DataTypes, Model } from "sequelize";
import { IModelStatic, sequelize } from ".";
import { List } from "./lists";

interface ITask extends Model {
  name: string;
  id: string;
  order: number;
  description: string;
  listId: string;

  createdAt: Date;
  updatedAt: Date;
}

const Task = <IModelStatic<ITask>>sequelize.define(
  "tasks",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    order: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    listId: {
      type: DataTypes.UUID,
    },
  },
);

Task.associate = () => {
  Task.belongsTo(
    List,
    {
      foreignKey: "listId",
    },
  );
};

export { Task };
export type { ITask };
