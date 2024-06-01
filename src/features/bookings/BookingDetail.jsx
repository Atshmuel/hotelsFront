import styled from "styled-components";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";

import useBooking from "./useBooking";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const { booking, guest, cabin, isLoading } = useBooking();
  const { checkout } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource='booking' type='single' />;
  const { _id: bookingId, status } = booking || {};

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} guest={guest} cabin={cabin} />

      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <>
            <Modal>
              <Modal.Open opens="delete-cabin">
                <Button variation="danger">Delete booking</Button>
              </Modal.Open>
              <Modal.Window name="delete-cabin">
                <ConfirmDelete
                  disabled={isDeletingBooking}
                  booking={[booking.isPaid, guest.fullName]}
                  resourceName="booking"
                  onConfirm={() =>
                    deleteBooking(bookingId, { onSuccess: () => navigate(-1) })
                  }
                />
              </Modal.Window>
            </Modal>
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check in
            </Button>
          </>
        )}
        {booking.status === "checked-in" && (
          <Button onClick={() => checkout(bookingId)}>Check out</Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
