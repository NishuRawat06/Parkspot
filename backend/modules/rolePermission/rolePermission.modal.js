import Sequelize from "sequelize";
import { database } from "../../shared/config/database.js";

const tableName = "RolePermissions";

const rolePermission_model = database.define(
  tableName,
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Roles",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    permissionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Permissions",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    paranoid: true,
    timestamps: true,
    tableName: tableName,
    indexes: [
      {
        unique: true,
        fields: ["roleId", "permissionId"],
      },
    ],
  },
);

export default rolePermission_model;