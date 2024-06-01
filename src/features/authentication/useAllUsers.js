import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/apiUsers";

export function useAllUsers() {
  const {
    data: allUsers,
    isPending: isLoadingUsers,
    error,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });
  return { allUsers, isLoadingUsers, error };
}
