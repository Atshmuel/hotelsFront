import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export default function useBooking() {
  const { bookingId } = useParams();
  const {
    isPending: isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  const { booking, guest, cabin } = data || {};
  return { isLoading, booking, guest, cabin, error };
}
