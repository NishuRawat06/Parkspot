import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import setCookies from "../../shared/utils/cookies.js";
import { CrmUsers, Roles } from "../models.js";

/**
 * Auth DB + token helpers. Controllers stay thin.
 */

export const PERMISSION_INCLUDE = () => ({
  model: Roles,
  as: "role",
  include: [
    {
      model: null, // filled lazily to avoid circular imports
      as: "permissions",
      attributes: ["resource"],
      through: { attributes: [] },
    },
  ],
});

async function permissionModel() {
  return (await import("../permission/permission.modal.js")).default;
}

export async function findUserWithRole(id) {
  return CrmUsers.findByPk(id, {
    include: [
      {
        model: Roles,
        as: "role",
        include: [
          {
            model: await permissionModel(),
            as: "permissions",
            attributes: ["resource"],
            through: { attributes: [] },
          },
        ],
      },
    ],
    attributes: { exclude: ["password", "refreshToken"] },
  });
}

export async function findByEmailWithRole(email) {
  return CrmUsers.findOne({
    where: { email },
    include: [
      {
        model: Roles,
        as: "role",
        include: [
          {
            model: await permissionModel(),
            as: "permissions",
            attributes: ["resource"],
            through: { attributes: [] },
          },
        ],
      },
    ],
  });
}

export function signTokens(user, permissions, roleName) {
  const access_token = jwt.sign(
    { id: user.id, role: roleName, permissions },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );
  const refresh_token = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
  );
  return { access_token, refresh_token };
}

export function setAuthCookies(res, access_token, refresh_token) {
  setCookies({ res, name: "access_token", token: access_token, maxAge: 1000 * 60 * 60 * 24 * 2 });
  setCookies({ res, name: "refresh_token", token: refresh_token, maxAge: 1000 * 60 * 60 * 24 * 7 });
}

export function clearAuthCookies(res) {
  const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie("access_token", { sameSite: isProduction ? "none" : "lax", secure: isProduction, path: "/" });
  res.clearCookie("refresh_token", { sameSite: isProduction ? "none" : "lax", secure: isProduction, path: "/" });
}

export function decodeAccessToken(req) {
  const token = req.cookies?.access_token;
  if (!token) return { error: "Not authenticated", status: 401 };
  try {
    return { decoded: jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) };
  } catch {
    return { error: "Invalid token", status: 401 };
  }
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}
