import type { ReactNode } from "react";

export function TableWrap({ headers, children }: { headers: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left">
        <thead>
          <tr className="border-b-4 border-black bg-text-50">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-xs font-black uppercase tracking-wider text-text-600">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`px-4 py-3 font-bold text-text-950 ${className}`}>{children}</td>;
}

export function LoadingRow({ colSpan }: { colSpan: number }) {
  return (
    <tr>
      <td colSpan={colSpan} className="p-4">
        <div className="h-[120px] w-full animate-pulse border-4 border-black bg-text-100" />
      </td>
    </tr>
  );
}
