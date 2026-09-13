import Sequelize from "sequelize";
import { database } from "../../shared/config/database.js";

const tableName = "Permissions";

const permission_model = database.define(
  tableName,
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    resource: {
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

export default permission_model;
