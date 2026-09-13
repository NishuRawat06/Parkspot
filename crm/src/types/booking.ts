export interface Booking {
  id: number;
  user_name: string;
  email: string;
  phone_number: string;
  vehicle_number: string;
  vehicle_type: string;
  entry: string;
  exit: string | null;
  expected_exit: string | null;
  base_price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data: {
    count: number;
    rows: Booking[];
  };
  page: string;
  limit: string;
}

export type EditableBookingField =
  | "user_name"
  | "email"
  | "phone_number"
  | "vehicle_number"
  | "vehicle_type"
  | "base_price"
  | "expected_exit"
  | "entry"
  | null;
