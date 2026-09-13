"use client";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useBookings } from "@/hooks/useBookings";
import { BookingStats } from "@/components/bookings/BookingStats";
import { BookingToolbar } from "@/components/bookings/BookingToolbar";
import { BookingPagination } from "@/components/bookings/BookingPagination";
import { BookingCard } from "@/components/bookings/BookingCard";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingGrid } from "@/components/common/LoadingGrid";

const Page = () => {
  const router = useRouter();
  const b = useBookings();
  return (
    <main className="min-h-screen w-full bg-background p-4 md:p-6">
      <div className="border-b-4 border-black pb-4">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="mb-1 text-xs font-black uppercase tracking-widest text-primary">
              Parking Management / Bookings
            </p>
            <h1 className="text-4xl font-black uppercase tracking-tight text-text-950 md:text-5xl">
              All Bookings
            </h1>
            <p className="mt-1 font-bold text-text-600">
              Manage all parking bookings
            </p>
          </div>
          <button
            onClick={() => router.push("/Bookings/add")}
            className="flex shrink-0 items-center justify-center gap-2 border-4 border-black bg-primary px-5 py-4 font-black uppercase text-primary-foreground shadow-[5px_5px_0px_black] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_black]"
          >
            <Plus size={20} strokeWidth={3} />
            Add Booking
          </button>
        </div>
      </div>
      <BookingStats
        total={b.total}
        parked={b.totalParked}
        exited={b.totalExited}
        abandoned={b.totalAbandoned}
      />
      <BookingToolbar
        search={b.search}
        onSearchChange={(v) => {
          b.setSearch(v);
          b.setCurrentPage(1);
        }}
        sortType={b.sortType}
        onSortTypeChange={(v) => {
          b.setSortType(v);
          b.setCurrentPage(1);
        }}
        sort={b.sort}
        onToggleSort={b.handleSort}
      />
      {b.loading ? (
        <LoadingGrid count={4} />
      ) : b.bookings.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
          {b.bookings.map((booking, i) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              index={(b.currentPage - 1) * b.itemsPerPage + i + 1}
              onUpdate={b.refresh}
            />
          ))}
        </div>
      )}
      <BookingPagination
        currentPage={b.currentPage}
        totalPages={b.totalPages}
        total={b.total}
        itemsPerPage={b.itemsPerPage}
        onPageChange={b.setCurrentPage}
        onLimitChange={(limit) => {
          b.setItemsPerPage(limit);
          b.setCurrentPage(1);
        }}
      />
    </main>
  );
};
export default Page;
