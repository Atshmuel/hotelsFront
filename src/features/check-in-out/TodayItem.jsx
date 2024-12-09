import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";



import { getGuest } from "../../services/apiGuests";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../ui/Modal";
import ConfirmCheckOut from "./ConfirmCheckOut";
import { useCheckout } from "./useCheckout";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

const getGuestFlag = async (id) => {
  return await getGuest(id)
}

function TodayItem({ activity }) {
  const { _id: id, status, guestID, numNights } = activity;
  
  const { checkout, isCheckingOut } = useCheckout();
  const [guestData, setGuestData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        setIsLoading((loading) => !loading);
        const data = await getGuestFlag(guestID);
        setGuestData(data);
      } catch (error) {
        console.error('Error fetching guest data:', error);
      } finally {
        setIsLoading((loading) => !loading);
      }
    };

    fetchGuestData();
  }, [guestID]);
  if (isLoading || !guestData) return <Spinner />

  return (
    <Modal>
      <StyledTodayItem>
        {status === 'unconfirmed' && <Tag type='green'>Arriving</Tag>}
        {status === 'checked-in' && <Tag type='blue'>Departing</Tag>}
        <Flag src={`${guestData?.countryFlag}`}
          alt={`Flag of ${guestData?.country}`} />
        <Guest>{guestData.fullName}</Guest>
        <div>{numNights} nights</div>
        {status === 'unconfirmed' && <Button as={Link} size='small' location='center' to={`/checkin/${id}`}>Check in</Button>}
        {status === 'checked-in' &&

          <Modal.Open opens="check-out">
            <Button size='small' location='center'>
              Check out
            </Button>
          </Modal.Open>
        }
      </StyledTodayItem>

      <Modal.Window name="check-out">
        <ConfirmCheckOut
          resourceName={id}
          onConfirm={() => checkout(id)}
          disabled={isCheckingOut}
        />
      </Modal.Window>
    </Modal>
  )
}

export default TodayItem
