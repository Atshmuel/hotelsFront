import { useState } from "react";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";


import { useUser } from "./useUser";
import { Avatar } from "./UserAvatar";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  const { updateUserData, isUpdatingUser } = useUpdateUser();

  const {
    user: {
      email,
      firstName: currFirstName,
      lastName: currLastName,
      phone: currPhoneNumber,
      userAvatar: currAvatar,
    },
  } = useUser();
  const [firstName, setFirstName] = useState(currFirstName);
  const [lastName, setLastName] = useState(currLastName);
  const [phone, setPhoneNum] = useState(currPhoneNumber);
  const [userAvatar, setUserAvatar] = useState(currAvatar);

  function handleSubmit(e) {
    e.preventDefault();
    if (!firstName || !lastName || !phone) return;
    updateUserData({ firstName, lastName, phone, userAvatar });

  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="First name">
        <Input disabled={isUpdatingUser}

          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          id="firstName"
        />
      </FormRow>

      <FormRow label="Last name">
        <Input disabled={isUpdatingUser}
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          id="lastName"
        />
      </FormRow>
      <FormRow label="Phone number">
        <Input disabled={isUpdatingUser}
          type="number"
          value={phone}
          onChange={(e) => setPhoneNum(e.target.value)}
          id="phoneNum"
          required
        />
      </FormRow>
      <FormRow label="Avatar URL">
        <Input disabled={isUpdatingUser}
          id="avatar"
          type="text"
          value={userAvatar}
          onChange={(e) => setUserAvatar(e.target.value)}
        />
        {
          currAvatar &&
          <Avatar src={userAvatar.length > 15 ? userAvatar : currAvatar} />
        }
      </FormRow>

      <FormRow>
        <Button disabled={isUpdatingUser} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdatingUser}>{isUpdatingUser ? <SpinnerMini /> : 'Update account'}</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
