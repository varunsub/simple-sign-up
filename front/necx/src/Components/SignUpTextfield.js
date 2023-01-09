import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import "../styles/main.css";
export default function SignUpTextfield({ name, placeholder, control }) {
  return (
    <Controller
      name={name}
      className="login-input"
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          className="login-input"
          onChange={onChange}
          value={value}
          label={placeholder}
          type={name == "password" || name == "cpassword" ? "password" : null}
        />
      )}
    />
  );
}
