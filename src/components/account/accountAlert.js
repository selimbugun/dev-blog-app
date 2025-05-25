import { Alert } from "@mui/material";

export default function AccountAlert({ type, message }) {
  if (!message) return null;

  return <Alert severity={type}>{message}</Alert>;
}
