import { useUser } from "./useUser";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";

import { useForm } from "react-hook-form";
import { useCreateUser } from "./useCreateUser";

function SignupForm({ onCloseModal }) {
  const { signupUser, isSigningUp } = useCreateUser();
  const options = [
    { value: "employee", lable: "Employee" },
    { value: "admin", lable: "Admin" },
  ];
  const {
    user: { role },
    isLoadingUserData,
  } = useUser();
  const { register, handleSubmit, getValues, formState, setValue, reset } =
    useForm();
  const { errors } = formState;

  if (isLoadingUserData) return <Spinner />;

  function handleRoleChange(e) {
    setValue("userRole", e.target.value);
  }
  function onSubmit(formData) {
    if (!formData.userRole) formData.userRole = options.at(0).value;
    signupUser(formData, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="First name" error={errors?.firstName?.message}>
        <Input
          disabled={isSigningUp}
          type="text"
          id="firstName"
          autoFocus={true}
          {...register("firstName", {
            required: "This field is required",
            minLength: {
              value: 2,
              message: "Employee name should contain at least 2 letters.",
            },
            pattern: {
              value: /^[^0-9]*$/,
              message: "Name cannot contain digits!",
            },
          })}
        />
      </FormRow>

      <FormRow label="Last name" error={errors?.lastName?.message}>
        <Input
          disabled={isSigningUp}
          type="text"
          id="lastName"
          {...register("lastName", {
            required: "This field is required",
            minLength: {
              value: 2,
              message: "Employee name should contain at least 2 letters.",
            },
            pattern: {
              value: /^[^0-9]*$/,
              message: "Name cannot contain digits!",
            },
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isSigningUp}
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            minLength: {
              value: 4,
              message: "Email should be at least 5 letters long.",
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email is not valid",
            },
          })}
        />
      </FormRow>

      <FormRow label="Phone number" error={errors?.phone?.message}>
        <Input
          disabled={isSigningUp}
          type="number"
          id="phone"
          {...register("phone", {
            required: "This field is required",
            minLength: {
              value: 10,
              message: "Phone number must be 10 letters long.",
            },
            maxLength: {
              value: 10,
              message: "Phone number must be 10 letters long.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Avatar" error={errors?.userAvatar?.message}>
        <Input
          disabled={isSigningUp}
          type="text"
          id="userAvatar"
          {...register("userAvatar")}
        />
      </FormRow>

      <FormRow label="Role" hidden={role === "employee"}>
        <Select
          id="userRole"
          {...register("userRole")}
          options={options}
          disabled={role === "employee" || isSigningUp}
          onChange={handleRoleChange}
        ></Select>
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          disabled={isSigningUp}
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password should have at least 8 characters.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isSigningUp}
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",

            validate: (currVal) =>
              currVal === getValues().password || "Passwords needs to match.",
          })}
        />
      </FormRow>

      <FormRow>
        <Button disabled={isSigningUp} variation="secondary" type="reset">
          Reset
        </Button>
        <Button disabled={isSigningUp}>
          {isSigningUp ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
