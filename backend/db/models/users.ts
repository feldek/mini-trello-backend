import { DataTypes, Model } from "sequelize";
import { IModelStatic, sequelize } from ".";
import { Board } from "./boards";

interface IUser extends Model {
  email: string;
  password: string;
  confirm: boolean;
  id: string;
  avatar: string;

  createdAt: Date;
  updatedAt: Date;
}

const User = <IModelStatic<IUser>>sequelize.define(
  "users",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirm: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    avatar: {
      type: DataTypes.STRING,
    },
  },
);

User.associate = () => {
  User.hasMany(
    Board,
    {
      foreignKey: "userId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  );
};

export { User };
export type { IUser };
