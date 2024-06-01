import styled from "styled-components";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import SpinnerMini from "../../ui/SpinnerMini";

const StyledConfirmLogout = styled.div`
  width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Bolder = styled.span`
  font-weight: 600;
`;

function ConfirmLogout({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmLogout>
      <Heading as="h3">
        <Bolder>{resourceName}</Bolder>, are you sure you want to logout?
      </Heading>

      <div>
        <Button
          location="center"
          variation="secondary"
          disabled={disabled}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button
          disabled={disabled}
          location="center"
          onClick={(e) => {
            onConfirm(e);
            onCloseModal?.();
          }}
        >
          {disabled ? <SpinnerMini /> : "Logout"}
        </Button>
      </div>
    </StyledConfirmLogout>
  );
}

export default ConfirmLogout;
