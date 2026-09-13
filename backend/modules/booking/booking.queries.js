import { Op } from "sequelize";
import booking_modal from "./booking.modal.js";

/**
 * DB helpers shared by booking controllers.
 * Keeps query-building out of request handlers.
 */

export async function markAbandonedBookings() {
  try {
    const parked = await booking_modal.findAll({
      where: { status: "parked", expected_exit: { [Op.not]: null } },
      raw: true,
    });

    const now = Date.now();
    for (const booking of parked) {
      const expectedMs = new Date(booking.expected_exit).getTime();
      if (!Number.isNaN(expectedMs) && expectedMs < now) {
        await booking_modal.update(
          { status: "abandoned" },
          { where: { id: booking.id } },
        );
      }
    }
  } catch (error) {
    console.error("Error marking abandoned bookings:", error);
  }
}

export function buildBookingWhere({ search = "", base_price, status }) {
  const where = {};

  if (String(search).trim()) {
    const q = `%${String(search).trim()}%`;
    where[Op.or] = [
      { user_name: { [Op.iLike]: q } },
      { email: { [Op.iLike]: q } },
      { vehicle_number: { [Op.iLike]: q } },
      { phone_number: { [Op.iLike]: q } },
    ];
  }

  if (base_price) where.base_price = Number(base_price);
  if (status) where.status = { [Op.iLike]: `%${status}%` };

  return where;
}

export function filterStaysInRange(allStays, startMs, endMs, nowMs) {
  return allStays.filter((s) => {
    const entryMs = new Date(s.entry).getTime();
    if (Number.isNaN(entryMs)) return false;
    const exitMs = s.exit ? new Date(s.exit).getTime() : NaN;
    const billedEnd =
      !Number.isNaN(exitMs) && exitMs > entryMs ? exitMs : nowMs;
    return entryMs < endMs && billedEnd > startMs;
  });
}
