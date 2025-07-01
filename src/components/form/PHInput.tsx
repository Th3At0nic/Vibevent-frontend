import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TPHInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  defaultValue?: string | number; // Add defaultValue prop
  placeholder?: string;
  rows?: number;
  required?: boolean;
};

const PHInput = ({
  type,
  name,
  label,
  disabled,
  defaultValue,
  placeholder,
  rows,
  required,
}: TPHInputProps) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Controller
        name={name}
        defaultValue={defaultValue ?? ""} // Ensure default value is passed
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            {type === "textarea" ? (
              <Input.TextArea
                placeholder={placeholder}
                {...field}
                rows={rows}
                id={name}
                disabled={disabled}
                required={required}
              />
            ) : (
              <Input
                placeholder={placeholder}
                {...field}
                type={type}
                id={name}
                disabled={disabled}
                required={required}
              />
            )}
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
