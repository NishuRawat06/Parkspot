import { Roles, Permissions, CrmUsers } from "../models.js";
import {
  findRoleByName,
  roleWithPermissions,
  setRolePermissions,
} from "./role.service.js";

export const getAllRoles = async (req, res) => {
  try {
    const roles = await Roles.findAll({
      include: [
        {
          model: Permissions,
          as: "permissions",
          attributes: ["id", "resource"],
          through: { attributes: [] },
        },
        { model: CrmUsers, as: "users", attributes: ["id", "email", "name"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({ success: true, data: roles });
  } catch (err) {
    console.error("Get roles error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch roles" });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const role = await roleWithPermissions(req.params.id);
    if (!role)
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    return res.status(200).json({ success: true, data: role });
  } catch (err) {
    console.error("Get role error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch role" });
  }
};

export const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Role name is required" });
    if (await findRoleByName(name)) {
      return res
        .status(400)
        .json({ success: false, message: "Role already exists" });
    }

    const role = await Roles.create({ name });
    await setRolePermissions(role, permissions);
    return res
      .status(201)
      .json({ success: true, data: await roleWithPermissions(role.id) });
  } catch (err) {
    console.error("Create role error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create role" });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;
    const role = await Roles.findByPk(id);
    if (!role)
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });

    if (name) {
      if (await findRoleByName(name, id)) {
        return res
          .status(400)
          .json({ success: false, message: "Role name already exists" });
      }
      role.name = name;
      await role.save();
    }

    await setRolePermissions(role, permissions);
    return res
      .status(200)
      .json({ success: true, data: await roleWithPermissions(id) });
  } catch (err) {
    console.error("Update role error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update role" });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Roles.findByPk(id);
    if (!role)
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });

    const userCount = await CrmUsers.count({ where: { roleId: id } });
    if (userCount > 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Cannot delete role assigned to users",
        });
    }

    await role.destroy();
    return res
      .status(200)
      .json({ success: true, message: "Role deleted successfully" });
  } catch (err) {
    console.error("Delete role error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete role" });
  }
};

export const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permissions.findAll({
      order: [["resource", "ASC"]],
    });
    return res.status(200).json({ success: true, data: permissions });
  } catch (err) {
    console.error("Get permissions error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch permissions" });
  }
};

export const createPermission = async (req, res) => {
  try {
    const { resource } = req.body;
    if (!resource)
      return res
        .status(400)
        .json({ success: false, message: "Permission resource is required" });

    const [permission, created] = await Permissions.findOrCreate({
      where: { resource },
      defaults: { resource },
    });
    if (!created)
      return res
        .status(400)
        .json({ success: false, message: "Permission already exists" });
    return res.status(201).json({ success: true, data: permission });
  } catch (err) {
    console.error("Create permission error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create permission" });
  }
};

export const deletePermission = async (req, res) => {
  try {
    const permission = await Permissions.findByPk(req.params.id);
    if (!permission)
      return res
        .status(404)
        .json({ success: false, message: "Permission not found" });

    await permission.destroy();
    return res
      .status(200)
      .json({ success: true, message: "Permission deleted successfully" });
  } catch (err) {
    console.error("Delete permission error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete permission" });
  }
};
