import styled from "styled-components";
import Modal from "./Modal";
import ButtonIcon from "./ButtonIcon";

import { HiArrowLeftOnRectangle, HiUserCircle } from "react-icons/hi2";
import { useLogout } from "../features/authentication/useLogout";
import { formatUpperCase } from "../utils/helpers";
import { useUser } from "../features/authentication/useUser";
import ConfirmLogout from "../features/authentication/ConfirmLogout";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
`;

function HeaderMenu() {
  const navigation = useNavigate();
  const {
    user: { firstName },
  } = useUser();
  const { logoutUser, isLoggingOut } = useLogout();
  const upperName = formatUpperCase(firstName);

  return (
    <StyledHeaderMenu>
      <Modal>
        <li>
          <DarkModeToggle />
        </li>
        <li>
          <ButtonIcon onClick={() => navigation("/account")}>
            <HiUserCircle />
          </ButtonIcon>
        </li>

        <li>
          <Modal.Open opens="logout">
            <ButtonIcon>
              <HiArrowLeftOnRectangle />
            </ButtonIcon>
          </Modal.Open>
        </li>

        <Modal.Window name="logout">
          <ConfirmLogout
            disabled={isLoggingOut}
            onConfirm={logoutUser}
            resourceName={upperName}
          />
        </Modal.Window>
      </Modal>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
