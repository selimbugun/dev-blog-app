"use client";

import { useForm } from "react-hook-form";
import { loginAction } from "@/app/(account)/actions";
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

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    await console.log(data);
    try {
      const result = await loginAction(
        data.email,
        data.password,
        data.rememberMe
      );
      console.log(result);
    } catch (error) {
      console.error(error);
      alert("Giriş başarısız", error.message);
    }
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
            {...register("email", { required: true })}
            error={!!errors.email}
            label="E-posta"
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
            <Checkbox {...register("rememberMe")} />
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
