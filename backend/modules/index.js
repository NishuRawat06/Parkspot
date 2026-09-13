import { authrouter } from "./auth/index.js";
import { booking_router } from "./booking/index.js";
import { parking_Location_router } from "./parkingLocation/index.js";
import roles_router from "./roles/roles.routes.js";
import { crmUsersRouter } from "./crmUsers/index.js";
import { syncModels, CrmUsers, Roles, Permissions, RolePermissions } from "./models.js";

export const routers = [
  {
    path: "/auth",
    routers: authrouter,
  },
  {
    path: "/location",
    routers: parking_Location_router,
  },
  {
    path: "/booking",
    routers: booking_router,
  },
  {
    path: "/roles",
    routers: roles_router,
  },
  {
    path: "/users",
    routers: crmUsersRouter,
  },
];

export { syncModels, CrmUsers, Roles, Permissions, RolePermissions };
