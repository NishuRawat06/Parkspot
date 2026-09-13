import { Op } from "sequelize";
import ParkingLocation from "./parkingLocation.modal.js";

export const addLocation = async (req, res) => {
  try {
    const { address, slots, basePrice } = req.body;
    if (!address || !slots || !basePrice) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const location = await ParkingLocation.create({ address, slots, basePrice });
    return res.status(201).json({ success: true, data: location });
  } catch (err) {
    console.error("Error adding location:", err);
    return res.status(500).json({ success: false, message: "Failed to add location" });
  }
};

export const allLocation = async (req, res) => {
  try {
    const {
      address,
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "DESC",
    } = req.query;
    const offset = (page - 1) * limit;
    const where = {};
    if (address) {
      where.address = { [Op.iLike]: `%${address}%` };
    }
    const { rows, count } = await ParkingLocation.findAndCountAll({
      order: [[sort, order]],
      limit: parseInt(limit),
      offset: parseInt(offset),
      where,
    });
    return res.status(200).json({ success: true, data: { rows, count }, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    console.error("Error fetching locations:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch locations" });
  }
};

export const editLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, slots, basePrice } = req.body;
    const [updated] = await ParkingLocation.update({ address, slots, basePrice }, { where: { id } });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Location not found" });
    }
    const location = await ParkingLocation.findByPk(id);
    return res.status(200).json({ success: true, data: location });
  } catch (err) {
    console.error("Error updating location:", err);
    return res.status(500).json({ success: false, message: "Failed to update location" });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ParkingLocation.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Location not found" });
    }
    return res.status(200).json({ success: true, message: "Location deleted successfully" });
  } catch (err) {
    console.error("Error deleting location:", err);
    return res.status(500).json({ success: false, message: "Failed to delete location" });
  }
};
