export const buildDayWindows = (rangeStartMs, rangeEndMs) => {
  const windows = [];
  const cursor = new Date(rangeStartMs);
  cursor.setUTCHours(0, 0, 0, 0);
  const end = new Date(rangeEndMs);
  end.setUTCHours(0, 0, 0, 0);

  while (cursor.getTime() < end.getTime()) {
    const start = new Date(cursor);
    const next = new Date(cursor);
    next.setUTCDate(next.getUTCDate() + 1);
    windows.push([start.getTime(), next.getTime()]);
    cursor.setTime(next.getTime());
  }

  return windows;
};

const overlapMs = (entry, exit, start, end) =>
  Math.max(0, Math.min(exit, end) - Math.max(entry, start));

export function billedEndMs(stay, nowMs) {
  const entry = new Date(stay.entry).getTime();
  if (Number.isNaN(entry)) return null;

  const exitRaw = stay.exit ? new Date(stay.exit).getTime() : NaN;
  const expectedRaw = stay.expected_exit
    ? new Date(stay.expected_exit).getTime()
    : NaN;
  const status = String(stay.status || "").toLowerCase();
  const isActive = status === "parked";

  // Real exit always wins — this keeps exited bookings in history.
  if (!Number.isNaN(exitRaw) && exitRaw > entry)
    return { entry, billedEnd: exitRaw, isActive, exitRaw };
  if (isActive) return { entry, billedEnd: nowMs, isActive, exitRaw };
  // Abandoned / exited-without-exit: bill until expected_exit so the
  // stay still shows up in graphs instead of vanishing to zero.
  if (!Number.isNaN(expectedRaw) && expectedRaw > entry)
    return { entry, billedEnd: expectedRaw, isActive, exitRaw };
  return { entry, billedEnd: entry, isActive, exitRaw };
}

export const accrueRevenue = (stays, windows, nowMs) => {
  const byDay = windows.map(([start]) => ({
    day: new Date(start).toISOString().slice(0, 10),
    revenue: 0,
    bookings: 0,
    parkedHours: 0,
  }));

  const firstStart = windows.length ? windows[0][0] : 0;
  const cappedNow = Math.min(
    nowMs,
    windows.length ? windows[windows.length - 1][1] : nowMs,
  );

  const byVehicle = new Map();
  const byStatus = new Map();
  const customerMap = new Map();
  const totals = {
    revenue: 0,
    bookings: 0,
    parkedHours: 0,
    liveRevenue: 0,
    activeCount: 0,
  };

  for (const stay of stays) {
    const status = String(stay.status || "").toLowerCase();
    byStatus.set(status, (byStatus.get(status) || 0) + 1);

    const billed = billedEndMs(stay, cappedNow);
    if (!billed) continue;

    const { entry, billedEnd, isActive, exitRaw } = billed;
    const ratePerHour = Number(stay.base_price) || 0;

    const entryIndex = Math.floor((entry - firstStart) / 86400000);
    if (entryIndex >= 0 && entryIndex < byDay.length)
      byDay[entryIndex].bookings += 1;

    totals.bookings += 1;

    const vKey = stay.vehicle_type || "unknown";
    if (!byVehicle.has(vKey))
      byVehicle.set(vKey, { revenue: 0, bookings: 0, parkedHours: 0 });
    const vAgg = byVehicle.get(vKey);
    vAgg.bookings += 1;

    const cKey = `${stay.user_name || "Unknown"}|${stay.email || ""}`;
    if (!customerMap.has(cKey)) {
      customerMap.set(cKey, {
        name: stay.user_name || "Unknown",
        email: stay.email || "",
        vehicleNumber: stay.vehicle_number || "",
        revenue: 0,
        bookings: 0,
        parkedHours: 0,
      });
    }
    const cAgg = customerMap.get(cKey);
    cAgg.bookings += 1;

    if (billed.billedEnd <= billed.entry) continue;

    const parkedHours = (billedEnd - entry) / 3600000;
    const bookingRevenue = parkedHours * ratePerHour;

    if (isActive && Number.isNaN(exitRaw)) {
      totals.liveRevenue += bookingRevenue;
      totals.activeCount += 1;
    }

    totals.parkedHours += parkedHours;
    totals.revenue += bookingRevenue;

    vAgg.revenue += bookingRevenue;
    vAgg.parkedHours += parkedHours;

    cAgg.revenue += bookingRevenue;
    cAgg.parkedHours += parkedHours;

    for (let i = 0; i < windows.length; i++) {
      const [start, end] = windows[i];
      const ms = overlapMs(entry, billedEnd, start, end);
      if (ms <= 0) continue;
      byDay[i].revenue += (ms / 3600000) * ratePerHour;
      byDay[i].parkedHours += ms / 3600000;
    }
  }

  const byCustomer = [...customerMap.values()].sort(
    (a, b) => b.revenue - a.revenue,
  );
  return { byDay, byVehicle, byCustomer, byStatus, totals };
};
