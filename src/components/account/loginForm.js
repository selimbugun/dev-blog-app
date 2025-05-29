"use client";

import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import EmailInput from "./emailInput";
import PasswordInput from "./passwordInput";
import useLogin from "@/hooks/useLogin";
import AccountLayout from "./layout/accountLayout";
import AccountAlert from "./accountAlert";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const confirmed = searchParams.get("confirmed");
  const { login } = useLogin();

  const [state, setState] = useState({
    mounted: false,
    confirmedAlert: false,
    error: "",
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, mounted: true }));
  }, []);

  useEffect(() => {
    if (confirmed) {
      setState((prev) => ({ ...prev, confirmedAlert: true }));

      window.history.replaceState(null, "", "/login");
    }
  }, [confirmed]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setState((prev) => ({ ...prev, error: "" }));
    const error = await login(data);
    if (error) setState((prev) => ({ ...prev, error }));
  };

  return (
    <AccountLayout title="Giriş Yap">
      {state.confirmedAlert && (
        <AccountAlert
          type="success"
          message="Hesabınız onaylandı. Giriş Yapabilirsiniz."
        />
      )}
      {state.error && <AccountAlert type="error" message={state.error} />}
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
            disabled={!state.mounted}
          />
          <PasswordInput
            {...register("password", {
              required: "Şifre zorunlu",

              maxLength: {
                value: 20,
                message: "En fazla 20 karakter olmalı",
              },
            })}
            error={errors.password}
            disabled={!state.mounted}
          />
          <Button
            component={Link}
            href="/forgot-password"
            variant="span"
            sx={{ mt: "3px", textTransform: "none" }}
          >
            Şifrenizi mi unuttunuz?
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            color="success"
            fullWidth
            type="submit"
            disabled={!state.mounted}
            sx={{ color: "#fff" }}
          >
            {!state.mounted ? (
              "Lütfen Bekleyin"
            ) : isSubmitting ? (
              <CircularProgress color="white" size={24} />
            ) : (
              "Giriş Yap"
            )}
          </Button>
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" align="center">
            Hesabınız yok mu?{"  "}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            href="/register"
            sx={{ textTransform: "none", ml: 1 }}
          >
            Kayıt Ol
          </Button>
        </Box>
      </Box>
    </AccountLayout>
  );
}
