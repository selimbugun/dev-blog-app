import { Backdrop, CircularProgress } from "@mui/material";

export default function LoadingComponent() {
  return (
    <Backdrop open={true}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
}
