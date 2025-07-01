import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

type TPHDatePickerProps = {
  name: string;
  label?: string;
};

const PHDatePicker = ({ name, label }: TPHDatePickerProps) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <DatePicker
              id={name}
              size="large"
              style={{ width: "100%" }}
              showTime // <-- This enables time picker in the same input
              value={field.value ? dayjs(field.value) : null} // Convert ISO string to dayjs object
              onChange={(date) =>
                field.onChange(date ? date.toISOString() : null)
              } // Convert back to ISO string
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
