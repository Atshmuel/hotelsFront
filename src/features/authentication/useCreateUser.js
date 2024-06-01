import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signupUser as signupUserApi } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { mutate: signupUser, isPending: isSigningUp } = useMutation({
    mutationFn: signupUserApi,
    onSuccess: () => {
      toast.success("Employee has signed up successfully.");
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { signupUser, isSigningUp };
}
