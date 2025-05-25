// app/account/reset-password/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const supabase = createClient;

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type");

    if (token_hash && type === "recovery") {
      supabase.auth
        .verifyOtp({ type: "recovery", token_hash })
        .then(({ error }) => {
          if (error) {
            setMessage("Doğrulama başarısız: " + error.message);
          }
          setLoading(false);
        });
    } else {
      setMessage("Geçersiz bağlantı.");
      setLoading(false);
    }
  }, [searchParams]);

  const handleSubmit = async () => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage("Şifre güncellenemedi: " + error.message);
    } else {
      setMessage("Şifre başarıyla güncellendi!");
      window.location.href = "/login";
    }
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2">
        Yeni Şifreni Belirle
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 4, gap: 3 }}>
        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Yeni şifre"
        />
        <Button variant="contained" onClick={handleSubmit}>
          Şifreyi Güncelle
        </Button>
      </Box>
      {message && <Alert severity="info">{message}</Alert>}
    </Container>
  );
}
