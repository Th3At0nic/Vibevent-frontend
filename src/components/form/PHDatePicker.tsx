import { DatePicker, Form } from "antd";
import moment from "moment";
import { Controller } from "react-hook-form";

type TPHDatePickerProps = {
  name: string;
  label?: string;
};

const PHDatePicker = ({ name, label }: TPHDatePickerProps) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      {/* <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <DatePicker {...field} id={name} size="large" style={{width: "100%"}} />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      /> */}
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <DatePicker
              id={name}
              size="large"
              style={{ width: "100%" }}
              value={field.value ? moment(field.value) : null} // ✅ Convert to moment
              onChange={(date) =>
                field.onChange(date ? date.toISOString() : null)
              } // ✅ Convert back to string
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
