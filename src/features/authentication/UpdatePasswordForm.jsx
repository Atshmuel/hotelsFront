import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";

import { useUpdateUser } from "./useUpdateUser";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const {updateUserData,isUpdatingUser} = useUpdateUser();


  function onSubmit({ newPassword,oldPassword }) {
    updateUserData({ newPassword,oldPassword }, { onSuccess: ()=>reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Old password"
        error={errors?.oldPassword?.message}
      >
        <Input
          type="password"
          id="oldPassword"
          disabled={isUpdatingUser}
          {...register("oldPassword", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="New password (min 8 characters)"
        error={errors?.newPassword?.message}
      >
        <Input
          type="password"
          id="newPassword"
          autoComplete="current-password"
          disabled={isUpdatingUser}
          {...register("newPassword", {
            required: "This field is required",
            validate: (value) =>
              getValues().oldPassword !== value || "Old password and new passsword can't be the same",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isUpdatingUser}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().newPassword === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdatingUser}>{isUpdatingUser ? <SpinnerMini/>:'Update password'}</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
