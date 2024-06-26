import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingAfterDate } from "../../services/apiBookings";

export function useBookingsSales() {
    const [searchParams] = useSearchParams();
    const numOfDays = +searchParams.get('last') || 7;

    const { data: bookingsSales, isPending: isLoadingSales, error } = useQuery({
        queryKey: ['bookingsValue', numOfDays],
        queryFn: () => getBookingAfterDate(numOfDays, "createdAt-extrasPrice-totalPrice")
    })
    return { bookingsSales, isLoadingSales, error }
}