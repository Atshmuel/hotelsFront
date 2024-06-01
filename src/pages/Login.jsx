import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../services/apiUsers";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { useEffect } from "react";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  const navigation = useNavigate();
  useEffect(() => {
    const check = async () => {
      const hasToken = await checkToken();
      if (hasToken) navigation("/dashboard", { replace: true });
    };
    check();
  }, [navigation]);

  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
