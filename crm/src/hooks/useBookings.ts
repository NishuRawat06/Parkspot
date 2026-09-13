"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useDebouncing from "@/hooks/useDebouncing";
import type { Booking, BookingResponse } from "@/types/booking";

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);

  const [parked, setParked] = useState(0);
  const [exited, setExited] = useState(0);
  const [abandoned, setAbandoned] = useState(0);

  const [totalParked, setTotalParked] = useState(0);
  const [totalExited, setTotalExited] = useState(0);
  const [totalAbandoned, setTotalAbandoned] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("DESC");
  const [sortType, setSortType] = useState("createdAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const debouncedSearch = useDebouncing(search, 500);

  const countBy = (rows: Booking[], status: string) =>
    rows.filter((b) => b.status?.toLowerCase() === status).length;

  const getStats = useCallback(async () => {
    try {
      const res = await axios.get(`/api/backend/crm/booking/stats`);
      const byStatus = res.data?.data?.byStatus ?? [];
      const find = (key: string) =>
        byStatus.find((s: { key: string }) => s.key === key);
      setTotalParked(Number(find("parked")?.count ?? 0));
      setTotalExited(Number(find("exited")?.count ?? 0));
      setTotalAbandoned(Number(find("abandoned")?.count ?? 0));
    } catch (error) {
      console.error("Stats error:", error);
    }
  }, []);

  const getBookings = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (debouncedSearch.trim())
        params.append("search", debouncedSearch.trim());
      params.append("sort", sortType);
      params.append("order", sort);
      params.append("limit", String(itemsPerPage));
      params.append("page", String(currentPage));
      params.append("offset", String((currentPage - 1) * itemsPerPage));
      const res = await axios.get<BookingResponse>(
        `/api/backend/crm/booking/getall?${params.toString()}`,
      );
      const rows = res.data?.data?.rows ?? [];
      setBookings(rows);
      setTotal(res.data?.data?.count ?? 0);
      setParked(countBy(rows, "parked"));
      setExited(countBy(rows, "exited"));
      setAbandoned(countBy(rows, "abandoned"));
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to fetch bookings");
      setBookings([]);
      setTotal(0);
      setParked(0);
      setExited(0);
      setAbandoned(0);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, sort, sortType, currentPage, itemsPerPage]);

  useEffect(() => {
    getBookings();
    getStats();
  }, [getBookings, getStats]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, sort, sortType]);

  const handleSort = () => setSort((prev) => (prev === "ASC" ? "DESC" : "ASC"));
  const refresh = () => {
    getBookings();
    getStats();
  };

  return {
    bookings,
    total,
    parked,
    exited,
    abandoned,
    totalParked,
    totalExited,
    totalAbandoned,
    loading,
    search,
    setSearch,
    sort,
    sortType,
    setSortType,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    debouncedSearch,
    totalPages: Math.ceil(total / itemsPerPage),
    handleSort,
    getBookings,
    getStats,
    refresh,
  };
}
