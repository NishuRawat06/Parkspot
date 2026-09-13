"use client";

import { LoadingRow, TableWrap, Td } from "@/components/common/DataTable";
import { formatHours, formatMoney } from "@/lib/format";
import type { VehicleTypeRow } from "@/types/reports";

interface Props {
  rows: VehicleTypeRow[];
  rangeDays: number;
  loading: boolean;
}

export function VehicleTable({ rows, rangeDays, loading }: Props) {
  return (
    <div className="mt-5 border-4 border-black bg-background shadow-[5px_5px_0px_black]">
      <div className="border-b-4 border-black bg-secondary px-4 py-3">
        <h2 className="text-lg font-black uppercase text-text-950">Vehicle Type Detail</h2>
      </div>
      <TableWrap headers={["Type", "Bookings", "Revenue", "Parked Hours", "Avg h/Stay", "Days Present"]}>
        {loading ? <LoadingRow colSpan={6} /> : rows.map((row) => (
          <tr key={row.vehicleType} className="border-b-2 border-black">
            <Td className="uppercase">{row.vehicleType}</Td>
            <Td>{row.bookings}</Td>
            <Td>{formatMoney(row.revenue)}</Td>
            <Td>{formatHours(row.parkedHours)}</Td>
            <Td>{formatHours(row.avgHoursPerStay)}</Td>
            <Td>{row.daysPresent} / {rangeDays}</Td>
          </tr>
        ))}
      </TableWrap>
    </div>
  );
}
