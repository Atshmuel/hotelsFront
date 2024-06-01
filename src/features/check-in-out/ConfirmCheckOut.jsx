import styled from "styled-components";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";

const StyledConfirmCheckOut = styled.div`
  width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

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

function ConfirmCheckOut({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmCheckOut>
      <Heading as="h3">Check Out booking #{resourceName}</Heading>
      <p>Are you sure you want to check this {resourceName} ?</p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button
          disabled={disabled}
          onClick={(e) => {
            onConfirm(e);
            onCloseModal?.();
          }}
        >
          Check Out
        </Button>
      </div>
    </StyledConfirmCheckOut>
  );
}

export default ConfirmCheckOut;
