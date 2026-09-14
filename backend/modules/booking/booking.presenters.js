import { billedEndMs } from "./booking.revenue.js";

export const roundByDay = (byDay) =>
  byDay.map((d) => ({
    ...d,
    revenue: Math.round(d.revenue),
    parkedHours: Math.round(d.parkedHours * 10) / 10,
  }));

export function bucketByDuration(stays) {
  const buckets = {
    "under 1h": 0,
    "1-4h": 0,
    "4-12h": 0,
    "12-24h": 0,
    "1-3 days": 0,
    "3+ days": 0,
  };

  for (const stay of stays) {
    const billed = billedEndMs(stay, Date.now());
    if (!billed || billed.billedEnd <= billed.entry) continue;

    const hours = (billed.billedEnd - billed.entry) / 3600000;
    if (hours < 1) buckets["under 1h"] += 1;
    else if (hours < 4) buckets["1-4h"] += 1;
    else if (hours < 12) buckets["4-12h"] += 1;
    else if (hours < 24) buckets["12-24h"] += 1;
    else if (hours < 72) buckets["1-3 days"] += 1;
    else buckets["3+ days"] += 1;
  }

  return buckets;
}

function daysPresentByVehicle(stays, windows, endMs, nowMs) {
  const daysByVehicle = new Map();
  for (let i = 0; i < windows.length; i++) {
    const seen = new Set();
    for (const stay of stays) {
      const billed = billedEndMs(stay, Math.min(nowMs, endMs));
      if (!billed || billed.billedEnd <= billed.entry) continue;
      if (billed.entry < endMs && billed.billedEnd > windows[i][0]) {
        seen.add(stay.vehicle_type || "unknown");
      }
    }
    for (const v of seen) daysByVehicle.set(v, (daysByVehicle.get(v) || 0) + 1);
  }
  return daysByVehicle;
}

export function toVehicleTypes(byVehicle, stays, windows, endMs, nowMs) {
  const daysByVehicle = daysPresentByVehicle(stays, windows, endMs, nowMs);
  return [...byVehicle.entries()]
    .map(([type, agg]) => ({
      vehicleType: type,
      bookings: agg.bookings,
      revenue: Math.round(agg.revenue),
      parkedHours: Math.round(agg.parkedHours * 10) / 10,
      avgHoursPerStay:
        agg.bookings > 0
          ? Math.round((agg.parkedHours / agg.bookings) * 10) / 10
          : 0,
      daysPresent: daysByVehicle.get(type) || 0,
    }))
    .sort((a, b) => b.revenue - a.revenue);
}

export function toTopCustomers(byCustomer, limit = 10) {
  return byCustomer.slice(0, limit).map((c) => ({
    name: c.name,
    email: c.email,
    vehicleNumber: c.vehicleNumber,
    bookings: c.bookings,
    revenue: Math.round(c.revenue),
    parkedHours: Math.round(c.parkedHours * 10) / 10,
  }));
}
