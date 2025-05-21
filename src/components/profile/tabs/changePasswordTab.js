import { Button, TextField, Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";
import { useForm } from "react-hook-form";

export default function ChangePasswordTab() {
  const { handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid size={4}>
          <Typography variant="body1">Mevcut Şifreniz: </Typography>
        </Grid>
        <Grid size={8}>
          <TextField
            size="small"
            id="outlined-basic"
            variant="outlined"
            type="password"
          />
        </Grid>
        <Grid size={4}>
          <Typography variant="body1">Yeni Şifreniz: </Typography>
        </Grid>
        <Grid size={8}>
          <TextField
            size="small"
            id="outlined-basic"
            variant="outlined"
            type="password"
          />
        </Grid>
        <Grid size={4}>
          <Typography variant="body1">Yeni şifrenizi tekrar girin: </Typography>
        </Grid>
        <Grid size={8}>
          <TextField
            size="small"
            id="outlined-basic"
            variant="outlined"
            type="password"
          />
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{ mt: 2, textTransform: "none" }}
        >
          Değiştir
        </Button>
      </Grid>
    </Box>
  );
}
