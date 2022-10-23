// Node modules
import { ChangeEvent } from "react";

// Project files
import iInputField from "interfaces/iInputField";

interface iProps {
  field: iInputField;
  state: [any, Function];
}

export default function InputField({ field, state }: iProps) {
  const { key, autoFocus, label, placeholder, type, required } = field;
  const [value, setValue] = state;

  // Methods
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const clonedItem = { ...value };

    clonedItem[key] = event.target.value;
    setValue(clonedItem);
  }

  return (
    <label className="input input-field">
      <span>{label}:</span>
      <input
        autoFocus={autoFocus}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value[key]}
      />
    </label>
  );
}
