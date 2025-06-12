import TextField from "@mui/material/TextField";
import { forwardRef } from "react";

const EmailInput = forwardRef(
  ({ error, disabled, label = "E-posta", ...props }, ref) => {
    return (
      <TextField
        {...props}
        inputRef={ref}
        label={label}
        variant="outlined"
        fullWidth
        disabled={disabled}
        error={!!error}
        helperText={error?.message}
        type="email"
      />
    );
  }
);

EmailInput.displayName = "EmailInput";

export default EmailInput;
