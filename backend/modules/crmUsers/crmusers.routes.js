import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./crmusers.controllers.js";
import { authenticate, requirePermission } from "../../shared/middleware/rbac.js";

const crm = express.Router();
crm.use(authenticate);

crm.get("/", requirePermission("users:view"), getAllUsers);
crm.get("/:id", requirePermission("users:view"), getUserById);
crm.put("/:id", requirePermission("users:edit"), updateUser);
crm.delete("/:id", requirePermission("users:delete"), deleteUser);

export default { crm };