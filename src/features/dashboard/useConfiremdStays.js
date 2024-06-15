import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingAfterDate } from "../../services/apiBookings";

export function useConfirmedStays() {
  const [searchParams] = useSearchParams();
  const numOfDays = +searchParams.get("last") || 7;

  const {
    data: stays,
    isPending: isLoadingStays,
    error,
  } = useQuery({
    queryKey: ["checkins", numOfDays],
    queryFn: () => getBookingAfterDate(numOfDays, "numNights-status"),
  });

  return { stays, isLoadingStays, numOfDays, error };
}
