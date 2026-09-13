"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useDebouncing from "@/hooks/useDebouncing";

export interface LocationItem {
  id: number;
  address: string;
  slots: number;
  basePrice: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export function useLocations(initialLimit = 4) {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [sort, setSort] = useState("ASC");
  const [sortType, setSortType] = useState("createdAt");
  const [limit, setLimit] = useState(initialLimit);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const debouncedSearchTerm = useDebouncing(search, 500);

  const getLocations = useCallback(async () => {
    try {
      setLoading(true);
      const offset = (page - 1) * limit;
      const params = new URLSearchParams();
      if (debouncedSearchTerm) params.append("address", debouncedSearchTerm);
      params.append("sort", sortType);
      params.append("order", sort);
      params.append("limit", limit.toString());
      params.append("page", page.toString());
      params.append("offset", offset.toString());

      const res = await axios.get(
        `/api/backend/crm/location/getall?${params.toString()}`,
      );
      setLocations(res.data.data.rows);
      setTotal(res.data.data.count);
    } catch (error) {
      console.error("Error fetching locations:", error);
      toast.error("Failed to fetch locations");
      setLocations([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, sort, sortType, page, limit]);

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, sort, sortType]);

  const handleSort = () => {
    setSort((prevSort) => (prevSort === "ASC" ? "DESC" : "ASC"));
  };

  const handleLimitChange = (nextLimit: number) => {
    setLimit(nextLimit);
    setPage(1);
  };

  const totalPages = Math.ceil(total / limit);
  const totalSlots = locations.reduce(
    (totalSlots, location) => totalSlots + location.slots,
    0,
  );

  return {
    loading,
    search,
    setSearch,
    locations,
    sort,
    sortType,
    setSortType,
    limit,
    page,
    setPage,
    total,
    totalPages,
    totalSlots,
    handleSort,
    handleLimitChange,
    refresh: getLocations,
  };
}

export type LocationsState = ReturnType<typeof useLocations>;
