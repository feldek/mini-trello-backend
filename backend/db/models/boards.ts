import { DataTypes, Model } from "sequelize";
import { IModelStatic, sequelize } from "./index";
import { List } from "./lists";
import { User } from "./users";

interface IBoard extends Model {
  userId: string;
  name: string;
  id: string;

  createdAt: Date;
  updatedAt: Date;
}

const Board = <IModelStatic<IBoard>>sequelize.define(
  "boards",
  {
    userId: {
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
  },
);

Board.associate = () => {
  Board.hasMany(
    List,
    {
      foreignKey: "boardId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  );

  Board.belongsTo(
    User,
    {
      foreignKey: "userId",
    },
  );
};

export { Board };
export type { IBoard };
