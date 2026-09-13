import bcrypt from "bcrypt";
import { CrmUsers, Roles } from "../models.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await CrmUsers.findAll({
      include: [
        {
          model: Roles,
          as: "role",
          attributes: ["id", "name"],
        },
      ],
      attributes: { exclude: ["password", "refreshToken"] },
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error("Get users error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch users" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await CrmUsers.findByPk(id, {
      include: [
        {
          model: Roles,
          as: "role",
          attributes: ["id", "name"],
        },
      ],
      attributes: { exclude: ["password", "refreshToken"] },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error("Get user error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, roleId, password } = req.body;

    const user = await CrmUsers.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (email && email !== user.email) {
      const existingUser = await CrmUsers.findOne({ where: { email } });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      }
      user.email = email;
    }

    if (name) user.name = name;
    if (roleId !== undefined) user.roleId = roleId || null;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    const updatedUser = await CrmUsers.findByPk(id, {
      include: [
        {
          model: Roles,
          as: "role",
          attributes: ["id", "name"],
        },
      ],
      attributes: { exclude: ["password", "refreshToken"] },
    });

    return res.status(200).json({ success: true, data: updatedUser });
  } catch (err) {
    console.error("Update user error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await CrmUsers.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.id === req.user.id) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot delete yourself" });
    }

    await user.destroy();
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete user" });
  }
};
