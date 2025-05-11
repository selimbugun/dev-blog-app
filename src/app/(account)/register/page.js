"use client";
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
import { redirect } from "next/navigation";

import { useForm } from "react-hook-form";
export default function Page() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      email2: "",
      password: "",
      password2: "",
      terms: false,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    // reset form values
    reset({
      name: "",
      username: "",
      email: "",
      email2: "",
      password: "",
      password2: "",
      terms: false,
    });
    redirect("/login");
  };

  return (
    <Container
      maxWidth="sm"
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
        Kayıt Ol
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box>
          <TextField
            {...register("name", {
              required: true,
              minLength: {
                value: 5,
                message: "En az 5 karakter olmalı",
              },
              maxLength: {
                value: 20,
                message: "En fazla 20 karakter olmalı",
              },
            })}
            type="text"
            helperText={errors.name?.message}
            error={!!errors.name}
            label="Ad Soyad"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            {...register("username", {
              required: true,
              minLength: {
                value: 5,
                message: "En az 5 karakter olmalı",
              },
              maxLength: {
                value: 20,
                message: "En fazla 20 karakter olmalı",
              },
            })}
            type="text"
            helperText={errors.username?.message}
            error={!!errors.username}
            label="Kullanıcı Adı"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            {...register("email", {
              required: true,
            })}
            type="email"
            helperText={errors.email?.message}
            error={!!errors.email}
            label="E-posta Adresi"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            {...register("email2", {
              required: true,
              validate: (value) =>
                value === getValues("email") || "E-postalar eşleşmiyor",
            })}
            type="email"
            helperText={errors.email2?.message}
            error={!!errors.email2}
            label="E-posta Adresi (Tekrar)"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "En az 8 karakter olmalı",
              },
              maxLength: {
                value: 20,
                message: "En fazla 20 karakter olmalı",
              },
            })}
            type="password"
            helperText={errors.password?.message}
            error={!!errors.password}
            label="Şifre"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            {...register("password2", {
              required: true,
              validate: (value) =>
                value === getValues("password") || "Şifreler eşleşmiyor",
            })}
            type="password"
            helperText={errors.password2?.message}
            error={!!errors.password2}
            label="Şifre (Tekrar)"
            variant="outlined"
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
            <Checkbox
              {...register("terms", {
                required: {
                  value: true,
                  message: "Kullanım koşullarını kabul etmelisiniz",
                },
              })}
            />
            <Typography variant="body2" component="span">
              Kullanım Koşullarını ve Gizlilik Politikasını kabul ediyorum.
            </Typography>
            {errors.terms && (
              <Typography variant="body2" color="error">
                {errors.terms?.message + "!"}
              </Typography>
            )}
          </Box>
          <Button variant="contained" fullWidth type="submit">
            {isSubmitting ? (
              <CircularProgress color="white" size={24} />
            ) : (
              "Kayıt Ol"
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
