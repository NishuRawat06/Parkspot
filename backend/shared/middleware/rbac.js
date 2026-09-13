import jwt from "jsonwebtoken";
import { CrmUsers, Roles, Permissions } from "../../modules/models.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await CrmUsers.findByPk(decoded.id, {
      include: [
        {
          model: Roles,
          as: "role",
          include: [
            {
              model: Permissions,
              as: "permissions",
              attributes: ["resource"],
              through: { attributes: [] },
            },
          ],
        },
      ],
      attributes: { exclude: ["password", "refreshToken"] },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;
    req.permissions = user.role?.permissions?.map((p) => p.resource) || [];
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.permissions?.includes(permission)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required permission: ${permission}`,
      });
    }
    next();
  };
};

export const requireRole = (...roles) => {
  return (req, res, next) => {
      const userRole = req.user?.role?.name;
      if (!userRole || !roles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required role: ${roles.join(" or ")}`,
        });
      }
      next();
  };
};

export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await CrmUsers.findByPk(decoded.id, {
      include: [
        {
          model: Roles,
          as: "role",
          include: [
            {
              model: Permissions,
              as: "permissions",
              attributes: ["resource"],
              through: { attributes: [] },
            },
          ],
        },
      ],
      attributes: { exclude: ["password", "refreshToken"] },
    });

    if (user) {
      req.user = user;
      req.permissions = user.role?.permissions?.map((p) => p.resource) || [];
    }
    next();
  } catch (err) {
    next();
  }
};
