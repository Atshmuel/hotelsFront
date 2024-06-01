import styled from "styled-components";
import { useBookingsSales } from './useBookingsSales'
import { useConfirmedStays } from "./useConfiremdStays";
import Stats from "./Stats";
import SalesChart from './SalesChart'
import DurationChart from "./DurationChart";
import Spinner from "../../ui/Spinner";
import TodayActivity from "../check-in-out/TodayActivity";
import useBookings from "../bookings/useBookings";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 36rem auto;
  gap: 2rem;
`;


function DashboardLayout() {
  const { bookingsSales, isLoadingSales } = useBookingsSales();
  const { stays, isLoadingStays, numOfDays } = useConfirmedStays()
  const { isLoading: isLoadingBookings, bookings } = useBookings()

  if (isLoadingSales || isLoadingStays || isLoadingBookings) return <Spinner />
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookingsSales} confirmedStays={stays} numOfDays={numOfDays} />
      <TodayActivity bookings={bookings} />
      <DurationChart stays={stays} numOfDays={numOfDays} />
      <SalesChart bookingsSales={bookingsSales} numOfDays={numOfDays} />
    </StyledDashboardLayout>
  )
}
export default DashboardLayout;