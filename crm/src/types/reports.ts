export interface DailyPoint {
  day: string;
  bookings: number;
  revenue: number;
  parkedHours?: number;
}

export interface VehicleTypeRow {
  vehicleType: string;
  bookings: number;
  revenue: number;
  parkedHours: number;
  avgHoursPerStay: number;
  daysPresent: number;
}

export interface TopCustomerRow {
  name: string;
  email: string;
  vehicleNumber: string;
  bookings: number;
  revenue: number;
  parkedHours: number;
}

export interface ReportRange {
  from: string;
  to: string;
  days: number;
}

export interface ReportSummary {
  totalBookings: number;
  cancelledCount: number;
  rangeBookings: number;
  rangeRevenue: number;
  parkedHours: number;
  liveRevenue: number;
  activeNow: number;
  avgHoursPerStay: number;
}

export interface ReportData {
  range: ReportRange;
  daily: DailyPoint[];
  vehicleTypes: VehicleTypeRow[];
  durationBuckets: Record<string, number>;
  topCustomers: TopCustomerRow[];
  statusCounts: Record<string, number>;
  summary: ReportSummary;
}

export interface ReportResponse {
  success: boolean;
  message: string;
  data: ReportData;
}

export interface CountPoint {
  key: string;
  count: number;
}

export interface StatsSummary {
  totalBookings: number;
  windowRevenue: number;
  allTimeRevenue: number;
  liveRevenue: number;
}

export interface StatsData {
  daily: DailyPoint[];
  byVehicleType: CountPoint[];
  byStatus: CountPoint[];
  summary: StatsSummary;
  days: number;
}

export interface StatsResponse {
  success: boolean;
  message: string;
  data: StatsData;
}

export interface Booking {
  id: number;
  user_name: string;
  vehicle_number: string;
  vehicle_type: string;
  base_price: number;
  status: string;
}

export interface BookingResponse {
  success: boolean;
  data: { rows: Booking[] };
}

export interface LocationResponse {
  success: boolean;
  data: { count: number; rows: { slots: number }[] };
}
