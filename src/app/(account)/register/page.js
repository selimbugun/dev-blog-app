"use client";

import {
  Box,
  Button,
  Typography,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AccountLayout from "@/components/account/layout/accountLayout";
import AccountAlert from "@/components/account/accountAlert";
import EmailInput from "@/components/account/emailInput";
import PasswordInput from "@/components/account/passwordInput";
import useRegister from "@/hooks/useRegister";

export default function Page() {
  const { register: registerHook } = useRegister();
  const [state, setState] = useState({
    error: "",
    confirm: false,
  });

  const {
    reset,
    register,
    handleSubmit,
    getValues,
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

  const onSubmit = async (formData) => {
    const { error, state: confirmState } = await registerHook(formData);
    if (error) {
      setState((prev) => ({ ...prev, error }));
    }
    if (confirmState) {
      setState((prev) => ({ ...prev, error: "", confirm: confirmState }));
      reset({
        email: "",
        email2: "",
        password: "",
        password2: "",
        terms: false,
      });
    }
  };

  return (
    <AccountLayout title="Kayıt Ol">
      {state.error ? (
        <AccountAlert type="error" message={state.error} />
      ) : (
        state.confirm && (
          <AccountAlert
            type="success"
            message="Kayıt başarılı, e-postanızı kontrol ediniz."
          />
        )
      )}
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <EmailInput
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Geçersiz e-posta adresi",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mt: 2 }}
          />
          <EmailInput
            {...register("email2", {
              required: true,
              validate: (value) =>
                value === getValues("email") || "E-postalar eşleşmiyor",
            })}
            error={!!errors.email2}
            helperText={errors.email2?.message}
            sx={{ mt: 2 }}
            label="E-posta (Tekrar)"
          />
          <PasswordInput
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
              validate: {
                hasNumber: (v) => /[0-9]/.test(v) || "En az 1 rakam içermeli",
                hasSpecialChar: (v) =>
                  /[!@#$%^&*]/.test(v) || "En az 1 özel karakter",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <PasswordInput
            {...register("password2", {
              required: true,
              minLength: {
                value: 8,
                message: "En az 8 karakter olmalı",
              },
              maxLength: {
                value: 20,
                message: "En fazla 20 karakter olmalı",
              },
              validate: {
                hasNumber: (v) => /[0-9]/.test(v) || "En az 1 rakam içermeli",
                hasSpecialChar: (v) =>
                  /[!@#$%^&*]/.test(v) || "En az 1 özel karakter",
              },
            })}
            error={!!errors.password2}
            helperText={errors.password2?.message}
            label="Şifre (Tekrar)"
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
      </Box>
    </AccountLayout>
  );
}
