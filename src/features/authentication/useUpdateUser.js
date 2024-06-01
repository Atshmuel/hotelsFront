import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData as updateUserDataApi } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useUpdateUser() {
    const queryClient = useQueryClient()
    const { mutate: updateUserData, isPending: isUpdatingUser } = useMutation({
        mutationFn: updateUserDataApi,
        onSuccess: () => {
            toast.success("User updated successfully."),
                queryClient.invalidateQueries({ active: true });

        },
        onError: (error) => toast.error(error.message)

    })
    return { updateUserData, isUpdatingUser };
}