import { database } from "../shared/config/database.js";
import Roles from "./roles/roles.modal.js";
import Permissions from "./permission/permission.modal.js";
import RolePermissions from "./rolePermission/rolePermission.modal.js";
import CrmUsers from "./crmUsers/crmusers.modal.js";

Roles.belongsToMany(Permissions, {
  through: RolePermissions,
  foreignKey: "roleId",
  otherKey: "permissionId",
  as: "permissions",
});

Permissions.belongsToMany(Roles, {
  through: RolePermissions,
  foreignKey: "permissionId",
  otherKey: "roleId",
  as: "roles",
});

CrmUsers.belongsTo(Roles, {
  foreignKey: "roleId",
  as: "role",
});

Roles.hasMany(CrmUsers, {
  foreignKey: "roleId",
  as: "users",
});

const syncModels = async () => {
  try {
    await database.sync({ alter: true });
    console.log("All models synced successfully");
  } catch (err) {
    console.warn("Model sync warning (tables may already exist):", err.message);
  }
};

export {
  database,
  Roles,
  Permissions,
  RolePermissions,
  CrmUsers,
  syncModels,
};