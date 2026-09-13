/**
 * Validation helpers for booking times.
 * Keeps controllers small and easy to review.
 */

export function validateBookingTimes(entry, expected_exit) {
  const entryTime = new Date(entry);
  if (Number.isNaN(entryTime.getTime())) {
    return "Invalid entry time";
  }

  if (expected_exit) {
    const exitTime = new Date(expected_exit);
    if (Number.isNaN(exitTime.getTime())) {
      return "Invalid expected exit time";
    }
    if (exitTime.getTime() <= entryTime.getTime()) {
      return "Expected exit must be after entry time";
    }
  }

  return null;
}

export function parseListQuery(query, defaults = {}) {
  const { page = 1, limit = 4, sort = "createdAt", order = "DESC" } = query;
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || defaults.limit || 4;

  return {
    pageNumber,
    limitNumber,
    offset: (pageNumber - 1) * limitNumber,
    sort: String(sort),
    order: String(order).toUpperCase() === "ASC" ? "ASC" : "DESC",
  };
}

export function parseDateRange(query, nowMs) {
  const DAY = 86400000;
  let endMs = nowMs + DAY;
  let startMs = nowMs - 29 * DAY;

  if (query.from && query.to) {
    const from = new Date(`${query.from}T00:00:00Z`);
    const to = new Date(`${query.to}T00:00:00Z`);

    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
      return { error: "Invalid date format, use YYYY-MM-DD" };
    }
    if (from.getTime() >= to.getTime()) {
      return { error: "'from' date must be before 'to' date" };
    }

    startMs = from.getTime();
    endMs = to.getTime() + DAY;
  } else {
    const days = Math.min(Number(query.days) || 30, 365);
    startMs = nowMs - (days - 1) * DAY;
  }

  return { startMs, endMs };
}
