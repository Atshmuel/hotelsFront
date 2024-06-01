import { useUpdateSetting } from "./useUpdateSetting";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

function UpdateSettingsForm() {
  const { register } = useForm();
  const {
    settings: { minBookingLen, maxBookingLen, maxGuests, breakfastPrice } = {},
    isLoading,
  } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();

  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />;
  if (!minBookingLen || !maxBookingLen || !maxGuests || !breakfastPrice)
    return <Empty type="settings" resource="setting" />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          {...register("min-nights", {
            required: "This field cannot be empty!",
          })}
          defaultValue={minBookingLen}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLen")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          {...register("max-nights", {
            required: "This field cannot be empty!",
          })}
          defaultValue={maxBookingLen}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLen")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          {...register("max-guests", {
            required: "This field cannot be empty!",
          })}
          defaultValue={maxGuests}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuests")}
        />
      </FormRow>

      <FormRow label="Breakfast price ($)">
        <Input
          type="number"
          id="breakfast-price"
          {...register("breakfast-price", {
            required: "This field cannot be empty!",
          })}
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
