import { Pagination } from "@/components/common/Pagination";

interface BookingPaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function BookingPagination(props: BookingPaginationProps) {
  return (
    <Pagination
      page={props.currentPage}
      totalPages={props.totalPages}
      total={props.total}
      limit={props.itemsPerPage}
      onPageChange={props.onPageChange}
      onLimitChange={props.onLimitChange}
    />
  );
}
