import { TextField, Input } from "@mui/material";
import { Controller } from "react-hook-form";
export default function SignUpTextfield({ name, placeholder, control }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField onChange={onChange} value={value} label={placeholder} />
      )}
    />
  );
}
