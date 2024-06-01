import { useEffect, useState } from "react";
import styled from "styled-components";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import { useSettings } from "../settings/useSettings";
import { useCheckin } from "./useCheckin";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import { formatCurrency } from "../../utils/helpers";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import { HiCheckCircle, HiPlusCircle } from "react-icons/hi2";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.6rem 4rem;
`;
const BolderText = styled.span`
  font-weight: 800;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { checkIn, isCheckingIn } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { booking, guest, cabin, isLoading } = useBooking();

  const [hasPaid, setHasPaid] = useState(false);
  const [breakfast, setBreakfast] = useState(false);

  useEffect(() => {
    setHasPaid(booking?.isPaid ?? false);
  }, [booking]);
  if (isLoading || isLoadingSettings) return <Spinner />;
  const { _id: bookingId, totalPrice, numNights, numGuests } = booking;

  const totalBreakfastPrice = settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!hasPaid) return;
    if (breakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: totalBreakfastPrice,
          totalPrice: totalPrice + totalBreakfastPrice,
        },
      });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} guest={guest} cabin={cabin} />
      {!booking.hasBreakfast && (
        <Box>
          <Button
            disabled={breakfast}
            onClick={() => {
              setBreakfast((breakfast) => !breakfast), setHasPaid(false);
            }}
          >
            {breakfast ? (
              <>
                <HiCheckCircle />
                Breakfast added
              </>
            ) : (
              <>
                <HiPlusCircle />
                Add Breakfasts for {`${formatCurrency(totalBreakfastPrice)}`}
              </>
            )}
          </Button>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={hasPaid}
          onChange={() => setHasPaid((hasPaid) => !hasPaid)}
          disabled={hasPaid || isCheckingIn}
          id="confirm"
        >
          I confirm that <BolderText>{guest.fullName}</BolderText> has paid the
          total amount
          <BolderText>
            {!breakfast
              ? formatCurrency(totalPrice)
              : `${formatCurrency(
                  totalPrice + totalBreakfastPrice
                )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                  totalBreakfastPrice
                )})`}
          </BolderText>
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={
            !hasPaid || isCheckingIn || booking?.status !== "unconfirmed"
          }
        >
          {isCheckingIn ? (
            <SpinnerMini />
          ) : (
            <>
              Check in Booking #
              {`${bookingId.slice(0, 2)}..${bookingId.slice(-3)}`}
            </>
          )}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
