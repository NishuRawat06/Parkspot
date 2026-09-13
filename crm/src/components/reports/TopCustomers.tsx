"use client";

import { LoadingRow, TableWrap, Td } from "@/components/common/DataTable";
import { formatHours, formatMoney } from "@/lib/format";
import type { TopCustomerRow } from "@/types/reports";

interface Props {
  customers: TopCustomerRow[];
  loading: boolean;
}

export function TopCustomers({ customers, loading }: Props) {
  return (
    <div className="mt-5 border-4 border-black bg-background shadow-[5px_5px_0px_black]">
      <div className="flex items-center justify-between border-b-4 border-black bg-secondary px-4 py-3">
        <h2 className="text-lg font-black uppercase text-text-950">Top Customers by Revenue</h2>
        <span className="text-xs font-black uppercase text-text-600">Top 10</span>
      </div>
      <TableWrap headers={["#", "Name", "Vehicle", "Bookings", "Parked Hours", "Revenue"]}>
        {loading ? <LoadingRow colSpan={6} /> : customers.length === 0 ? (
          <tr><td colSpan={6} className="p-8 text-center"><p className="font-black uppercase text-text-950">No customers in this range</p></td></tr>
        ) : customers.map((c, i) => (
          <tr key={`${c.email}-${c.vehicleNumber}`} className="border-b-2 border-black">
            <Td className="w-10 font-black text-primary">{i + 1}</Td>
            <Td><span className="block font-black uppercase">{c.name}</span><span className="text-xs font-bold text-text-600">{c.email}</span></Td>
            <Td className="uppercase">{c.vehicleNumber}</Td>
            <Td>{c.bookings}</Td>
            <Td>{formatHours(c.parkedHours)}</Td>
            <Td className="font-black">{formatMoney(c.revenue)}</Td>
          </tr>
        ))}
      </TableWrap>
    </div>
  );
}
