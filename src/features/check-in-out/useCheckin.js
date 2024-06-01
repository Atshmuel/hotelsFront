import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  const { mutate: checkIn, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (bookingId) => {
      toast.success(`Booking #${bookingId} successfully checked-in.`);
      queryClient.invalidateQueries({ active: true });
      navigation("/bookings");
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkIn, isCheckingIn };
}
