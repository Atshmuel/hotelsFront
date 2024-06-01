import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiUsers";
export function useUser() {
  const {
    data: user,
    isPending: isLoadingUserData,
    error: loginError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { user, isLoadingUserData, loginError };
}
