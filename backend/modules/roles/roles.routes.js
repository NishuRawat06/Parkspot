import express from "express";
import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  getAllPermissions,
  createPermission,
  deletePermission,
} from "./roles.controllers.js";
import { authenticate, requirePermission } from "../../shared/middleware/rbac.js";

const router = express.Router();

router.use(authenticate);

router.get("/permissions", getAllPermissions);
router.post("/permissions", requirePermission("roles:create"), createPermission);
router.delete("/permissions/:id", requirePermission("roles:delete"), deletePermission);

router.get("/", requirePermission("roles:view"), getAllRoles);
router.get("/:id", requirePermission("roles:view"), getRoleById);
router.post("/", requirePermission("roles:create"), createRole);
router.put("/:id", requirePermission("roles:edit"), updateRole);
router.delete("/:id", requirePermission("roles:delete"), deleteRole);

export default { crm: router };