import { Roles, Permissions, RolePermissions, CrmUsers, syncModels } from "./models.js";

const DEFAULT_PERMISSIONS = [
  "dashboard:view",
  "bookings:create",
  "bookings:view",
  "bookings:edit",
  "bookings:delete",
  "locations:create",
  "locations:view",
  "locations:edit",
  "locations:delete",
  "reports:view",
  "settings:view",
  "settings:edit",
  "users:create",
  "users:view",
  "users:edit",
  "users:delete",
  "roles:create",
  "roles:view",
  "roles:edit",
  "roles:delete",
];

const ROLE_PERMISSIONS = {
  admin: DEFAULT_PERMISSIONS,
  manager: [
    "dashboard:view",
    "bookings:create",
    "bookings:view",
    "bookings:edit",
    "locations:create",
    "locations:view",
    "locations:edit",
    "reports:view",
    "settings:view",
  ],
  staff: [
    "dashboard:view",
    "bookings:create",
    "bookings:view",
    "locations:view",
    "settings:view",
  ],
};

export const seedDatabase = async () => {
  await syncModels();

  for (const perm of DEFAULT_PERMISSIONS) {
    await Permissions.findOrCreate({
      where: { resource: perm },
      defaults: { resource: perm },
    });
  }

  for (const [roleName, permissions] of Object.entries(ROLE_PERMISSIONS)) {
    const [role] = await Roles.findOrCreate({
      where: { name: roleName },
      defaults: { name: roleName },
    });

    const permissionRecords = await Permissions.findAll({
      where: { resource: permissions },
    });
    await role.setPermissions(permissionRecords);
  }

  const adminRole = await Roles.findOne({ where: { name: "admin" } });
  const managerRole = await Roles.findOne({ where: { name: "manager" } });
  const staffRole = await Roles.findOne({ where: { name: "staff" } });
  const bcrypt = await import("bcrypt");

  const demoUsers = [
    { email: "admin@parkspot.com", password: "admin123", name: "Admin User", role: adminRole },
    { email: "manager@parkspot.com", password: "manager123", name: "Manager User", role: managerRole },
    { email: "staff@parkspot.com", password: "staff123", name: "Staff User", role: staffRole },
  ];

  for (const demo of demoUsers) {
    if (!demo.role) continue;
    const existing = await CrmUsers.findOne({ where: { email: demo.email } });
    if (!existing) {
      await CrmUsers.create({
        email: demo.email,
        password: await bcrypt.hash(demo.password, 10),
        name: demo.name,
        roleId: demo.role.id,
      });
      console.log(`Demo user created: ${demo.email} / ${demo.password}`);
    }
  }

  console.log("Database seeded successfully!");
};

seedDatabase().catch(console.error);
