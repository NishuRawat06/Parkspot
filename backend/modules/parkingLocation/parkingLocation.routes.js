import express from "express";
import {
  addLocation,
  allLocation,
  editLocation,
  deleteLocation,
} from "./parkingLocation.controllers.js";
import { authenticate, requirePermission } from "../../shared/middleware/rbac.js";

const crm = express.Router();
crm.use(authenticate);
crm.post("/addLocation", requirePermission("locations:create"), addLocation);
crm.get("/getall", requirePermission("locations:view"), allLocation);
crm.put("/editLocation/:id", requirePermission("locations:edit"), editLocation);
crm.delete("/deleteLocation/:id", requirePermission("locations:delete"), deleteLocation);
export default { crm };
