import { createClient } from "@/lib/supabaseClient";
import getUserServer from "@/utils/getUserServer";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const user = await getUserServer();
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users_extra")
    .select("*")
    .eq("id", user.user.user.id)
    .single();

  if (error) {
    console.error("Veri alınamadı:", error.message);
  }

  console.log(data);

  return (
    <Grid container rowSpacing={3} columnSpacing={3} sx={{ p: 3, m: 3 }}>
      <Grid size={{ sm: 4, xs: 12 }}>
        {/* <Paper elevation={3} sx={{ minWidth: 300 }}>
          <Typography variant="h4" sx={{ py: 2, textAlign: "center" }}>
            Profil Ayarları
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Button
              sx={{
                mb: 2,
                display: "block",
                width: "100%",
                textAlign: "left",
                textTransform: "none",
              }}
              onClick={() => setContent("photo")}
            >
              Fotoğrafını Güncelle
            </Button>
            <Button
              sx={{
                mb: 2,
                display: "block",
                width: "100%",
                textAlign: "left",
                textTransform: "none",
              }}
              onClick={() => setContent("update")}
            >
              Bilgileri Güncelle
            </Button>
            <Button
              sx={{
                mb: 2,
                display: "block",
                width: "100%",
                textAlign: "left",
                textTransform: "none",
              }}
              onClick={() => setContent("password")}
            >
              Sifre Değiştir
            </Button>
            <Button
              sx={{
                mb: 2,
                display: "block",
                width: "100%",
                textAlign: "left",
                textTransform: "none",
              }}
              onClick={() => setContent("delete")}
            >
              Hesabı Sil
            </Button>
          </Box>
          <Typography variant="h4" sx={{ py: 2, textAlign: "center" }}>
            Paylaşımlar
          </Typography>
          <Box>
            <Button
              sx={{
                mb: 2,
                display: "block",
                width: "100%",
                textAlign: "left",
                textTransform: "none",
              }}
              onClick={() => setContent("photo")}
            >
              Paylaşımları Görüntüle
            </Button>
            <Button
              sx={{
                mb: 2,
                display: "block",
                width: "100%",
                textAlign: "left",
                textTransform: "none",
              }}
              onClick={() => setContent("photo")}
            >
              Bildirimler
            </Button>
            <Button
              sx={{
                mb: 2,
                display: "block",
                width: "100%",
                textAlign: "left",
                textTransform: "none",
              }}
              onClick={() => setContent("photo")}
            >
              Yorumlar
            </Button>
          </Box>
        </Paper> */}
      </Grid>
      <Grid size={{ sm: 8, xs: 12 }}>
        <Paper elevation={3}></Paper>
      </Grid>
    </Grid>
  );
}
