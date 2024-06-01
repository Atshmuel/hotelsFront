/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { _id: editId, ...editValues } = cabinToEdit;
  const isEditting = Boolean(editId);
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();
  const isWorking = isCreating || isUpdating;
  const { register, handleSubmit, getValues, formState, reset } = useForm({
    defaultValues: isEditting ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(formData) {
    if (isEditting) {
      updateCabin(
        { editId, formData },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else
      createCabin(formData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          autoFocus={true}
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Minimum capacity should be '1' guest" },
            max: {
              value: 6,
              message: "Minimum capacity for a cabin is '6' guests",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type="number"
          defaultValue={100}
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            validate: (value) =>
              value >= 100 ||
              "Minimal cabin price for night should be at least 100$.",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            min: { value: 0, message: "Discount cannot be less than '0' !" },
            validate: (value) =>
              value <= getValues().regularPrice - 100 ||
              `Discount value must be 100$ less than the cabin regular price.  (Max discount $${
                getValues().regularPrice - 100
              })`,
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo URL" error={errors?.imgUrl?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="imgUrl"
          {...register("imgUrl", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        <Button
          disabled={isWorking}
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditting ? "Update Cabin" : "Add Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
