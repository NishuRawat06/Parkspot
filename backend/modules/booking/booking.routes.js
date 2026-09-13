import express from "express";
import {
  addBooking,
  editBooking,
  exitBooking,
  allbooking,
  bookingStats,
  bookingReport,
} from "./booking.controllers.js";
import { authenticate, requirePermission } from "../../shared/middleware/rbac.js";

const crm = express.Router();
crm.use(authenticate);
crm.post("/add", requirePermission("bookings:create"), addBooking);
crm.put("/edit/:id", requirePermission("bookings:edit"), editBooking);
crm.put("/exit/:id", requirePermission("bookings:edit"), exitBooking);
crm.get("/getall", requirePermission("bookings:view"), allbooking);
crm.get("/stats", requirePermission("dashboard:view"), bookingStats);
crm.get("/report", requirePermission("reports:view"), bookingReport);
export default { crm };
