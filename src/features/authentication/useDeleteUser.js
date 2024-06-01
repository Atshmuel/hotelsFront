import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "../../services/apiUsers";
import toast from "react-hot-toast";
export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { mutate: deleteUser, isPending: isDeletingUser } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      toast.success("Employee succesfully deleted");
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { deleteUser, isDeletingUser };
}
