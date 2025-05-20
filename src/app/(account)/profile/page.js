import { createClient } from "@/lib/supabaseClient";
import getUserServer from "@/utils/getUserServer";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Page() {
  const userData = await getUserServer();
  const user = userData?.user.user;
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users_extra")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Veri alınamadı:", error.message);
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Profil Sayfası
      </Typography>

      <Grid container spacing={4}>
        {/* Sol kısım: Profil Bilgileri */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 4,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 600, mb: 3 }}
              >
                Profil Bilgileri
              </Typography>
              <Grid container spacing={1}>
                <Grid size={6}>
                  <Typography color="text.secondary">Kullanıcı Adı</Typography>
                </Grid>
                <Grid size={6}>
                  <Typography>{data.username}</Typography>
                </Grid>

                <Grid size={6}>
                  <Typography color="text.secondary">E-posta</Typography>
                </Grid>
                <Grid size={6}>
                  <Typography>{user.email}</Typography>
                </Grid>

                <Grid size={6}>
                  <Typography color="text.secondary">Ad Soyad</Typography>
                </Grid>
                <Grid size={6}>
                  <Typography>{data.fullname}</Typography>
                </Grid>

                <Grid size={6}>
                  <Typography color="text.secondary">Doğum Tarihi</Typography>
                </Grid>
                <Grid size={6}>
                  <Typography>{data.date_of_birth}</Typography>
                </Grid>
              </Grid>
            </Box>

            <Stack direction="row" spacing={2} mt={4}>
              <Button variant="contained">Bilgileri Güncelle</Button>
              <Button variant="outlined" color="error">
                Şifre Değiştir
              </Button>
            </Stack>
          </Paper>
        </Grid>

        {/* Sağ kısım: Profil Fotoğrafı */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 4,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Profil Fotoğrafı
            </Typography>
            <Box my={2}>
              {data.avatar_url ? (
                <Avatar
                  src={data.avatar_url}
                  alt="Profil Fotoğrafı"
                  sx={{ width: 120, height: 120 }}
                />
              ) : (
                <Image
                  src="/no-image.png"
                  alt="No Image"
                  width={120}
                  height={120}
                  style={{ borderRadius: "50%" }}
                  priority
                />
              )}
            </Box>
            <Button variant="outlined" size="small">
              Profil Fotoğrafını Değiştir
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
