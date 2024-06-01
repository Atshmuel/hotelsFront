import styled, { css } from "styled-components";

import { formatUpperCase } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import SpinnerMini from "../../ui/SpinnerMini";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import { HiArrowTrendingDown, HiArrowTrendingUp, HiTrash, HiUserCircle } from "react-icons/hi2";
import { useUser } from "./useUser";
import { useDeleteUser } from "./useDeleteUser";
import { useUpdateUser } from "./useUpdateUser";


const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1.2fr 1.2fr 1.5fr 1fr 0.5fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:hover{
    background-color: var(--color-grey-100)
  }
`;

const Avatar = styled.img`
  display: block;
  width: 4.7rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  transform: scale(1.2) ;
  border-radius: 50%;
`;

const User = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  font-family: "Sono";
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const FirstName = styled.span``;
const LastName = styled.span`
  font-size: 1.2rem;
  line-height: 0.8rem;
  color: var(--color-grey-400);
`;

const PersonalInfo = styled.div`
  text-align: center;
`;

const Admin = styled.div`
  font-weight: 600;
  text-align: center;
`;

function UserRow({ user }) {
  const {
    email,
    role,
    phone,
    firstName,
    lastName,
    userAvatar,
    _id: userId,
  } = user;
  const { deleteUser, isDeletingUser } = useDeleteUser();
  const { updateUserData, isUpdatingUser } = useUpdateUser();

  const { user: currUser } = useUser();
  const employeeIsAdmin = role === "admin";

  function handleRoleChange(role, id) {
    updateUserData({ role, id })
  }



  return (
    <TableRow role="row" >
      {userAvatar ? <Avatar src={userAvatar} /> : <HiUserCircle size={42} />}
      <User>
        <FirstName>{formatUpperCase(firstName)}</FirstName>
        <LastName>{formatUpperCase(lastName)}</LastName>
      </User>
      <PersonalInfo>{phone}</PersonalInfo>
      <PersonalInfo>{email}</PersonalInfo>
      {isUpdatingUser ? <SpinnerMini /> : <PersonalInfo>
        {employeeIsAdmin ? (
          <Admin>{formatUpperCase(role)}</Admin>
        ) : (
          formatUpperCase(role)
        )}
      </PersonalInfo>}

      {currUser.role === "admin" && (
        <Modal>
          <Menus>
            <Menus.Toggle id={userId} />
            <Menus.List id={userId}>
              {!employeeIsAdmin &&
                <Menus.Button icon={<HiArrowTrendingUp />} onClick={() => handleRoleChange('admin', userId)}>Promote</Menus.Button>}
              {employeeIsAdmin &&
                <Menus.Button icon={<HiArrowTrendingDown />} onClick={() => handleRoleChange('employee', userId)}>Demote</Menus.Button>}
              <Modal.Open opens="delete-employee">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus>
          <Modal.Window name="delete-employee">
            <ConfirmDelete
              resourceName="employee"
              onConfirm={() => deleteUser(userId)}
              disabled={isDeletingUser}
            />
          </Modal.Window>
        </Modal>
      )}
    </TableRow>
  );
}

export default UserRow;
