import { fn, col } from "sequelize";
import booking_modal from "./booking.modal.js";
import { parseDateRange } from "./booking.validators.js";
import {
  accrueRevenue,
  billedEndMs,
  buildDayWindows,
} from "./booking.revenue.js";
import {
  roundByDay,
  bucketByDuration,
  toVehicleTypes,
  toTopCustomers,
} from "./booking.presenters.js";
import {
  filterStaysInRange,
  markAbandonedBookings,
} from "./booking.queries.js";

export const bookingStats = async (req, res) => {
  try {
    await markAbandonedBookings();
    const days = Math.min(Number(req.query.days) || 14, 90);

    const byStatus = await booking_modal.findAll({
      attributes: [
        ["status", "key"],
        [fn("COUNT", col("id")), "count"],
      ],
      group: ["status"],
      raw: true,
    });
    const byVehicleType = await booking_modal.findAll({
      attributes: [
        ["vehicle_type", "key"],
        [fn("COUNT", col("id")), "count"],
      ],
      group: ["vehicle_type"],
      raw: true,
    });
    const stays = await booking_modal.findAll({
      attributes: ["entry", "exit", "expected_exit", "base_price", "status", "vehicle_type", "user_name", "email", "vehicle_number"],
      raw: true,
    });

    const now = Date.now();
    const windows = buildDayWindows(now - days * 86400000, now + 86400000);
    const { byDay, totals } = accrueRevenue(stays, windows, now);
    const daily = roundByDay(byDay);
    const windowRevenue = daily.reduce((sum, d) => sum + d.revenue, 0);
    const totalBookings = Number(
      (
        await booking_modal.findAll({
          attributes: [[fn("COUNT", col("id")), "c"]],
          raw: true,
        })
      )[0]?.c || 0,
    );

    return res.status(200).json({
      success: true,
      message: "Booking stats fetched successfully",
      data: {
        byStatus,
        byVehicleType,
        daily,
        summary: {
          totalBookings,
          windowRevenue,
          allTimeRevenue: Math.round(totals.revenue),
          liveRevenue: Math.round(totals.liveRevenue),
        },
        days,
      },
    });
  } catch (error) {
    console.error("Error fetching booking stats:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch booking stats",
        error: error.message,
      });
  }
};

export const bookingReport = async (req, res) => {
  try {
    await markAbandonedBookings();
    const now = Date.now();

    const parsed = parseDateRange(req.query, now);
    if (parsed.error)
      return res.status(400).json({ success: false, message: parsed.error });
    const { startMs, endMs } = parsed;

    const allStays = await booking_modal.findAll({
      attributes: [
        "user_name",
        "email",
        "vehicle_number",
        "vehicle_type",
        "entry",
        "exit",
        "expected_exit",
        "base_price",
        "status",
      ],
      raw: true,
    });
    const stays = filterStaysInRange(allStays, startMs, endMs, now);
    const windows = buildDayWindows(startMs, endMs);
    const { byDay, byVehicle, byCustomer, byStatus, totals } = accrueRevenue(
      stays,
      windows,
      now,
    );

    return res.status(200).json({
      success: true,
      message: "Booking report fetched successfully",
      data: {
        range: {
          from: new Date(startMs).toISOString().slice(0, 10),
          to: new Date(endMs - 1).toISOString().slice(0, 10),
          days: byDay.length,
        },
        daily: roundByDay(byDay),
        vehicleTypes: toVehicleTypes(byVehicle, stays, windows, endMs, now),
        durationBuckets: bucketByDuration(stays),
        topCustomers: toTopCustomers(byCustomer),
        statusCounts: Object.fromEntries(byStatus),
        summary: {
          totalBookings: stays.length,
          cancelledCount: byStatus.get("abandoned") || 0,
          rangeBookings: totals.bookings,
          rangeRevenue: Math.round(totals.revenue),
          parkedHours: Math.round(totals.parkedHours * 10) / 10,
          liveRevenue: Math.round(totals.liveRevenue),
          activeNow: totals.activeCount,
          avgHoursPerStay:
            totals.bookings > 0
              ? Math.round((totals.parkedHours / totals.bookings) * 10) / 10
              : 0,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching booking report:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch booking report",
        error: error.message,
      });
  }
};
