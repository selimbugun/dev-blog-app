import TextField from "@mui/material/TextField";
import { forwardRef } from "react";

const PasswordInput = forwardRef(
  ({ error, helperText, disabled, label = "Şifre", ...props }, ref) => {
    return (
      <TextField
        {...props}
        inputRef={ref}
        label={label}
        variant="outlined"
        fullWidth
        disabled={disabled}
        error={error}
        helperText={helperText}
        type="password"
        sx={{ mt: 2 }}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
