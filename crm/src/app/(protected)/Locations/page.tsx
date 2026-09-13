"use client";

import Link from "next/link";
import { ArrowRight, ParkingSquare, Plus } from "lucide-react";
import LocationCard from "@/components/LocationCard";
import { LocationToolbar } from "@/components/locations/LocationToolbar";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { Pagination } from "@/components/common/Pagination";
import { useLocations } from "@/hooks/useLocations";
import { useAuth } from "@/lib/auth-context";

const Page = () => {
  const { hasPermission } = useAuth();
  const loc = useLocations();

  return (
    <main className="min-h-screen w-full bg-background p-4 md:p-5">
      <PageHeader
        eyebrow="Parking Management / Locations"
        title="All Locations"
        subtitle="Manage all your parking locations"
        className="mb-5"
        action={
          <Link
            href="/Locations/add"
            className="group flex w-fit items-center gap-2 border-4 border-black bg-primary px-4 py-2.5 text-sm font-black uppercase text-primary-foreground shadow-[4px_4px_0px_black] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_black]"
          >
            <Plus size={18} strokeWidth={3} />
            Add Location
          </Link>
        }
      />

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard label="Total Locations" value={loc.total} />
        <StatCard label="Total Slots" value={loc.totalSlots} />
        <LocationToolbar
          search={loc.search}
          onSearchChange={loc.setSearch}
          sortType={loc.sortType}
          onSortTypeChange={loc.setSortType}
          sort={loc.sort}
          onToggleSort={loc.handleSort}
        />
      </div>

      <div>
        {loc.loading ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-48 animate-pulse border-4 border-black bg-text-100"
              />
            ))}
          </div>
        ) : loc.locations.length === 0 ? (
          <div className="border-4 border-black bg-secondary p-8 text-center shadow-[4px_4px_0px_black]">
            <ParkingSquare
              size={42}
              strokeWidth={3}
              className="mx-auto text-text-950"
            />
            <h2 className="mt-3 text-xl font-black uppercase">
              No Locations Found
            </h2>
            <p className="mt-1 text-sm font-bold text-text-600">
              Start by adding your first parking location.
            </p>
            <Link
              href="/locations/add"
              className="mt-4 inline-flex items-center gap-2 border-4 border-black bg-primary px-4 py-2 text-sm font-black uppercase text-primary-foreground shadow-[4px_4px_0px_black]"
            >
              Add Location
              <ArrowRight size={18} strokeWidth={3} />
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {loc.locations.map(
                ({ id, address, slots, basePrice, createdAt }) => (
                  <LocationCard
                    key={id}
                    id={id}
                    address={address}
                    slots={slots}
                    basePrice={basePrice}
                    createdAt={createdAt}
                    onDelete={loc.refresh}
                    canDelete={hasPermission("locations:delete")}
                  />
                ),
              )}
            </div>
            <Pagination
              page={loc.page}
              totalPages={loc.totalPages}
              total={loc.total}
              limit={loc.limit}
              onPageChange={loc.setPage}
              onLimitChange={loc.handleLimitChange}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default Page;
