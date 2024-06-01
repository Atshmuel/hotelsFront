import styled from "styled-components";
import Table from "../../ui/Table";
import { useAllUsers } from "./useAllUsers";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import UserRow from "./UserRow";
const Title = styled.div`
  text-align: center;
`;

function UserTable() {
  const { allUsers, isLoadingUsers, error } = useAllUsers();
  if (isLoadingUsers) return <Spinner />;
  if (error) return <Empty resource="users" />;
  return (
    <Table columns="0.3fr 1.2fr 1.2fr 1.5fr 1fr 0.5fr">
      <Table.Header>
        <div></div>
        <Title>Name</Title>
        <Title>Phone number</Title>
        <Title>Email</Title>
        <Title>Role</Title>
        <div></div>
      </Table.Header>
      <Table.Body
        data={allUsers}
        resource={"users"}
        render={(user) => <UserRow user={user} key={user._id} />}
      />
    </Table>
  );
}

export default UserTable;
