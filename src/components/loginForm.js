"use client";

import { Controller, useForm } from "react-hook-form";
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
import { useEffect, useState } from "react";
import LoadingComponent from "./loading";

export default function LoginForm() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.error) {
        alert(result.error);
        return;
      }

      window.location.href = "/";
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
            disabled={!mounted}
          />
          <TextField
            {...register("password", { required: true })}
            error={!!errors.password}
            label="Şifre"
            variant="outlined"
            type="password"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!mounted}
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
            <Controller
              name="rememberMe"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  checked={field.value}
                  color="primary"
                  disabled={!mounted}
                />
              )}
            />
            <Typography variant="body2" component="span">
              Beni Hatırla
            </Typography>
          </Box>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={!mounted}
          >
            {!mounted ? (
              "Lütfen Bekleyin"
            ) : isSubmitting ? (
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
