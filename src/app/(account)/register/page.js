import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";

export default function Page() {
  function handleSubmit() {
    // Handle form submission logic here
    console.log("Form submitted");
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
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
        <Box component="form" noValidate onSubmit={() => handleSubmit()}>
          <TextField
            id="name"
            label="Ad Soyad"
            variant="outlined"
            fullWidth
            autoFocus
            sx={{ mt: 2 }}
          />
          <TextField
            id="username"
            label="Kullanıcı Adı"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            id="email"
            label="E-posta Adresi"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            id="email2"
            label="E-posta Adresi (Tekrar)"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            id="password"
            label="Şifre"
            variant="outlined"
            type="password"
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            id="password2"
            label="Şifre (Tekrar)"
            variant="outlined"
            type="password"
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
            <Checkbox />
            <Typography variant="body2" component="span">
              Kullanım Koşullarını ve Gizlilik Politikasını kabul ediyorum.
            </Typography>
          </Box>
          <Button variant="contained" fullWidth type="submit">
            Kayıt Ol
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
