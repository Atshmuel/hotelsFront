import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loginUser } from "../../services/apiUsers";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigation("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { login, isLoggingIn };
}
