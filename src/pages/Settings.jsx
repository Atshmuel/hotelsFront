import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import { useUser } from "./../features/authentication/useUser";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigation = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user.role === "employee") navigation("/dashboard", { replace: true });
  }, [user, navigation]);

  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
