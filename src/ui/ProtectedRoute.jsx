import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function ProtectedRoute({ children }) {
  const navigation = useNavigate();
  const { user, isLoadingUserData } = useUser();

  useEffect(() => {
    if (!user && !isLoadingUserData) return navigation("/login");
  }, [user, isLoadingUserData, navigation])

  if (isLoadingUserData)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );


  if (user) return children;
}
