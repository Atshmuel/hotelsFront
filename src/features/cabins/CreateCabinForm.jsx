/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";
import { imageUploader } from '../../utils/helpers'
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";
import styled from "styled-components";


const StyledDiv = styled.div`
  display: flex;
  width:fit-content;
  gap:1rem;
`;

const Img = styled.img`
  display: block;
  width: 6rem;
  aspect-ratio: 3/2;
  object-fit: cover;
  object-position: center;
  transition: .2s ease-in-out all;
  cursor: pointer;
  &:hover{
    scale:1.1
  }
`;

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
  async function onSubmit(formData) {
    if (!formData.imgsUrl.length) return

    const urls = await imageUploader(formData.imgsUrl, formData.name)
    formData.imgsUrl = urls

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
              `Discount value must be 100$ less than the cabin regular price.  (Max discount $${getValues().regularPrice - 100
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

      <FormRow label="Cabin photos" error={errors?.imgsUrl?.message}>
        <FileInput
          id="imgsUrl"
          accept="image/*"
          {...register("imgsUrl", {
            required: isEditting ? false : "This field is required",
          })}
        />
        <StyledDiv>
          {isEditting && formState.defaultValues.imgsUrl.map((img, i) => (
            <a href={img} target="_blank" key={i}><Img src={img} /></a>
          ))}
        </StyledDiv>
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
