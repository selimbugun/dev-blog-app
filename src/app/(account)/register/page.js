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
  Alert,
} from "@mui/material";
import { createClient } from "@/lib/supabaseClient";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      email2: "",
      password: "",
      password2: "",
      terms: false,
    },
  });
  const supabase = createClient;

  const onSubmit = async (formData) => {
    // email kullanılıyor mu kontrol
    const { data: user, error: userError } = await supabase.rpc(
      "is_email_registered",
      {
        email_text: formData.email,
      }
    );

    if (user) {
      setError("Bu e-posta adresi zaten kullanılıyor.");
      //email varsa bitir
      return;
    }

    //kayıt
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/login?confirmed=true`,
      },
    });
    console.log(data);

    if (signUpError) {
      setError(signUpError.message);
    } else {
      reset({
        email: "",
        email2: "",
        password: "",
        password2: "",
        terms: false,
      });
      setConfirm(true);
    }
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
        {error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          confirm && (
            <Alert severity="success">
              Kayıt başarılı, e-postanızı kontrol ediniz.
            </Alert>
          )
        )}
        <Box>
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
