import ProfileTabs from "@/components/profile/profileTabs";
import { createClient } from "@/lib/supabaseClient";
import getUserServer from "@/utils/getUserServer";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";
import Image from "next/image";

export default async function Page() {
  const userData = await getUserServer();
  if (!userData?.user) {
    window.location.href = "/login";
  }
  const user = await userData.user.user;
  const supabase = createClient;
  const { data, error } = await supabase
    .from("users_extra")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("Veri alınamadı:", error);
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
        <Grid size={{ xs: 12 }}>
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
                  <Typography>
                    {new Date(data.date_of_birth).toLocaleDateString("tr-TR")}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid size={12} sx={{ mt: 4 }}>
        <ProfileTabs data={data} user={user} />
      </Grid>
    </Container>
  );
}
