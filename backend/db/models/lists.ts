import { DataTypes, Model } from "sequelize";
import { IModelStatic, sequelize } from ".";
import { Board } from "./boards";
import { Task } from "./tasks";

export interface IList extends Model {
  boardId: string;
  name: string;
  id: string;

  createdAt: Date;
  updatedAt: Date;
}

export const List = <IModelStatic<IList>>sequelize.define("lists", {
  boardId: {
    type: DataTypes.UUID,
  },
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
});

List.associate = () => {
  List.hasMany(Task, {
    foreignKey: "listId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  List.belongsTo(Board, {
    foreignKey: "boardId",
  });
};
