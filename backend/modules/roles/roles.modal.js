import Sequelize from "sequelize";
import { database } from "../../shared/config/database.js";

const tableName = "Roles";

const role_model = database.define(
  tableName,
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    tableName: tableName,
  },
);

export default role_model;
