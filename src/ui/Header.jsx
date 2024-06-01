import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import { formatUpperCase } from "../utils/helpers";
import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.header`
  padding: 1.2rem 2.5rem;
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
`;

const Span = styled.span``;

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  gap: 0.2rem;
  background-color: var(--color-brand-600);
  color: var(--color-grey-50);
  font-size: 1.6rem;
  font-weight: 500;
  padding: 0.6rem 1rem;
  transition: all 0.3s;
  border-radius: var(--border-radius-sm);
  cursor: pointer;

  &:hover {
    color: var(--color-grey-600);
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-50);
    transition: all 0.3s;
  }

  &:hover svg {
    color: var(--color-brand-600);
  }
`;

const Bolder = styled.span`
  font-weight: 600;
`;

function Header() {
  const {
    user: { firstName, lastName },
  } = useUser();
  const upperName = formatUpperCase(firstName);
  return (
    <StyledHeader>
      <Span>
        Welcome, <Bolder>{`${upperName} ${lastName}`}</Bolder>
      </Span>
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
