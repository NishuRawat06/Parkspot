import Sequelize from "sequelize";
import { database } from "../../shared/config/database.js";

const tableName = "CrmUsers";

const crm_user_model = database.define(
  tableName,
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    roleId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Roles",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
  },
  { paranoid: true, timestamps: true, tableName: tableName }
);

export default crm_user_model;
