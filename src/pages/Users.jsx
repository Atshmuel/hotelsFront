import SignupForm from "../features/authentication/SignupForm";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import Row from "../ui/Row";
import UserTable from "../features/authentication/UserTable";

function UsersPage() {
  return (
    <Modal>
      <Row>
        <Heading as="h1">All Employees info</Heading>
      </Row>
      <Row>
        <UserTable />
      </Row>

      <Row>
        <Modal.Open opens="sign-up">
          <Button location="center">Sign up new employee</Button>
        </Modal.Open>
      </Row>
      <Modal.Window name="sign-up">
        <SignupForm />
      </Modal.Window>
    </Modal>
  );
}

export default UsersPage;
