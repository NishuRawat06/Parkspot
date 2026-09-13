import { Roles, Permissions, CrmUsers } from "../models.js";

/**
 * Role DB helpers. Controllers stay thin.
 */

const PERMISSION_ATTRS = ["id", "resource"];

export function roleWithPermissions(id) {
  return Roles.findByPk(id, {
    include: [{ model: Permissions, as: "permissions", attributes: PERMISSION_ATTRS, through: { attributes: [] } }],
  });
}

export async function setRolePermissions(role, permissions) {
  if (permissions && permissions.length > 0) {
    const records = await Permissions.findAll({ where: { resource: permissions } });
    await role.setPermissions(records);
  }
}

export async function findRoleByName(name, excludeId) {
  const existing = await Roles.findOne({ where: { name } });
  if (existing && excludeId && existing.id !== parseInt(excludeId)) return existing;
  if (existing && !excludeId) return existing;
  return null;
}
