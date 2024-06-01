import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/config";
export default function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterVal = searchParams.get("status") || "all";
  const sortVal = searchParams.get("sortBy") || "startDate-desc";
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isPending: isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ["bookings", filterVal, sortVal, page],
    queryFn: () => getAllBookings({ filterVal, sortVal, page }),
  });
  const { bookings, cabins, guests, totalBookings = 1 } = data || {};
  const totalPages = Math.ceil(totalBookings / PAGE_SIZE);
  if (page < totalPages)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterVal, sortVal, page + 1],
      queryFn: () => getAllBookings({ filterVal, sortVal, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterVal, sortVal, page - 1],
      queryFn: () => getAllBookings({ filterVal, sortVal, page: page - 1 }),
    });
  return { isLoading, bookings, cabins, guests, totalBookings, error };
}
