import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin as updateCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ editId, data }) => updateCabinApi(editId, data),
    onSuccess: () => {
      toast.success("Cabin has updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateCabin, isUpdating };
}
