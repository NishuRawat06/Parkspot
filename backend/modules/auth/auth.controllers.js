import jwt from "jsonwebtoken";
import { CrmUsers } from "../models.js";
import {
  clearAuthCookies,
  comparePassword,
  decodeAccessToken,
  findByEmailWithRole,
  findUserWithRole,
  hashPassword,
  setAuthCookies,
  signTokens,
} from "./auth.service.js";

export const getCurrentUser = async (req, res) => {
  try {
    const { decoded, error, status } = decodeAccessToken(req);
    if (error) return res.status(status).json({ message: error });

    const user = await findUserWithRole(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get user" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { decoded, error, status } = decodeAccessToken(req);
    if (error) return res.status(status).json({ message: error });

    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    await CrmUsers.update({ name }, { where: { id: decoded.id } });
    const updatedUser = await findUserWithRole(decoded.id);

    return res.status(200).json({ success: true, data: updatedUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to update profile" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { decoded, error, status } = decodeAccessToken(req);
    if (error)
      return res.status(status).json({ success: false, message: error });

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Both passwords are required" });
    }
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({
          success: false,
          message: "New password must be at least 6 characters",
        });
    }

    const user = await CrmUsers.findByPk(decoded.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Current password is incorrect" });

    await CrmUsers.update(
      { password: await hashPassword(newPassword) },
      { where: { id: decoded.id } },
    );
    return res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    console.error("CHANGE PASSWORD ERROR:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies?.access_token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        await CrmUsers.update(
          { refreshToken: null },
          { where: { id: decoded.id } },
        );
      } catch {}
    }

    clearAuthCookies(res);
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to logout" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { email, password, name, roleId } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const userExist = await CrmUsers.findOne({ where: { email } });
    if (userExist)
      return res.status(400).json({ message: "user already exist" });

    await CrmUsers.create({
      email,
      password: await hashPassword(password),
      name,
      roleId: roleId || null,
    });
    return res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await findByEmailWithRole(email);
    if (!existingUser)
      return res.status(400).json({ message: "wrong credentials" });

    const match = await comparePassword(password, existingUser.password);
    if (!match) return res.status(400).json({ message: "wrong credentials" });

    const permissions =
      existingUser.role?.permissions?.map((p) => p.resource) || [];
    const roleName = existingUser.role?.name || "staff";
    const { access_token, refresh_token } = signTokens(
      existingUser,
      permissions,
      roleName,
    );

    await CrmUsers.update(
      { refreshToken: refresh_token },
      { where: { id: existingUser.id } },
    );
    setAuthCookies(res, access_token, refresh_token);

    res.status(200).json({
      message: "Authentication successful! Passwords match.",
      userId: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: roleName,
      permissions,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
