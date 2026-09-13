import booking_modal from "./booking.modal.js";
import { validateBookingTimes, parseListQuery } from "./booking.validators.js";
import { buildBookingWhere, markAbandonedBookings } from "./booking.queries.js";

export const addBooking = async (req, res) => {
  try {
    const {
      user_name,
      email,
      phone_number,
      vehicle_number,
      vehicle_type,
      entry,
      expected_exit,
      base_price,
    } = req.body;

    const error = validateBookingTimes(entry, expected_exit);
    if (error) return res.status(400).json({ success: false, message: error });

    const create = await booking_modal.create({
      user_name,
      email,
      phone_number,
      vehicle_number,
      vehicle_type,
      entry,
      expected_exit,
      base_price,
      status: "parked",
      exit: null,
    });

    return res
      .status(200)
      .json({ success: true, message: "Booking added", data: create });
  } catch (err) {
    console.log("Error in adding booking:", err);
    return res
      .status(400)
      .json({
        success: false,
        message: "Failed to add booking",
        error: err.message,
      });
  }
};

export const editBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      user_name,
      email,
      phone_number,
      vehicle_number,
      vehicle_type,
      entry,
      expected_exit,
      base_price,
    } = req.body;

    const booking = await booking_modal.findByPk(id);
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });

    const error = validateBookingTimes(entry, expected_exit);
    if (error) return res.status(400).json({ success: false, message: error });

    await booking.update({
      user_name,
      email,
      phone_number,
      vehicle_number,
      vehicle_type,
      entry,
      expected_exit,
      base_price,
    });

    return res
      .status(200)
      .json({ success: true, message: "Booking updated", data: booking });
  } catch (err) {
    console.error("Error editing booking:", err);
    return res
      .status(400)
      .json({
        success: false,
        message: "Failed to update booking",
        error: err.message,
      });
  }
};

export const exitBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const reopen = req.body?.reopen;
    const booking = await booking_modal.findByPk(id);
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });

    if (reopen) {
      await booking.update({ exit: null, status: "parked" });
      return res
        .status(200)
        .json({
          success: true,
          message: "Booking reopened as parked",
          data: booking,
        });
    }

    await booking.update({ exit: new Date().toISOString(), status: "exited" });
    return res
      .status(200)
      .json({
        success: true,
        message: "Booking marked as exited",
        data: booking,
      });
  } catch (err) {
    console.error("Error exiting booking:", err);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to exit booking",
        error: err.message,
      });
  }
};

export const allbooking = async (req, res) => {
  try {
    await markAbandonedBookings();
    const { search = "", base_price, status } = req.query;
    const { pageNumber, limitNumber, offset, sort, order } = parseListQuery(
      req.query,
    );
    const where = buildBookingWhere({ search, base_price, status });

    const getall = await booking_modal.findAndCountAll({
      where,
      order: [[sort, order]],
      limit: limitNumber,
      offset,
    });

    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: { count: getall.count, rows: getall.rows },
      page: String(pageNumber),
      limit: String(limitNumber),
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch bookings",
        error: error.message,
      });
  }
};

export { bookingStats, bookingReport } from "./booking.stats.js";
