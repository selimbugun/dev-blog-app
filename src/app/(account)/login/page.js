"use client";
import { Login } from "@/service/fetchUsers";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Checkbox,
  CircularProgress,
} from "@mui/material";

import { useForm } from "react-hook-form";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    Login(data.username, data.password);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ mt: 4, mb: 4 }}
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography
        sx={{ my: 2 }}
        gutterBottom
        component="h1"
        variant="h4"
        align="center"
      >
        Giriş Yap
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box>
          <TextField
            {...register("username", { required: true })}
            error={!!errors.username}
            label="Kullanıcı Adı"
            variant="outlined"
            fullWidth
            autoFocus
          />
          <TextField
            {...register("password", { required: true })}
            error={!!errors.password}
            label="Şifre"
            variant="outlined"
            type="password"
            fullWidth
            sx={{ mt: 2 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Box sx={{ alignSelf: "flex-start", mb: 1 }}>
            <Checkbox />
            <Typography variant="body2" component="span">
              Beni Hatırla
            </Typography>
          </Box>
          <Button variant="contained" fullWidth type="submit">
            {isSubmitting ? (
              <CircularProgress color="white" size={24} />
            ) : (
              "Giriş Yap"
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
