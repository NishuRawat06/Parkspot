import express from "express";
import {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
  changePassword,
  logout,
} from "./auth.controllers.js";
import { authenticate, requirePermission } from "../../shared/middleware/rbac.js";

const crmRouter = express.Router();
crmRouter.post("/createUser", authenticate, requirePermission("users:create"), createUser);
crmRouter.post("/login", login);
crmRouter.get("/me", authenticate, getCurrentUser);
crmRouter.put("/profile", authenticate, updateProfile);
crmRouter.put("/change-password", authenticate, changePassword);
crmRouter.post("/logout", authenticate, logout);
export default { crm: crmRouter };
