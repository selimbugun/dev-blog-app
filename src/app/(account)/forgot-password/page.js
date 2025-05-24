"use client";
import { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { createClient } from "@/lib/supabaseClient";

export default function ForgotPasswordPage() {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const supabase = createClient;
    const { error } = await supabase.auth.resetPasswordForEmail(data.email);

    if (error) {
      setMessage("Bir hata oluştu: " + error.message);
    } else {
      setMessage("E-posta gönderildi. Lütfen gelen kutunu kontrol et.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: 400, margin: "auto", marginTop: 50 }}
    >
      <h2>Şifremi Unuttum</h2>
      {message && <Alert severity="info">{message}</Alert>}
      <TextField
        fullWidth
        label="E-posta"
        type="email"
        {...register("email", { required: true })}
        sx={{ mt: 2 }}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Şifre Sıfırlama Linki Gönder
      </Button>
    </form>
  );
}
