import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Task extends Model {
  public id!: number
  public title!: string
  public description!: string
  public status!: "pending" | "in_progress" | "completed"
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("pending", "in_progress", "completed"),
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "tasks",
    timestamps: false,
  }
);

export default Task;
