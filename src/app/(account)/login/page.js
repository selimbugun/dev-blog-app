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
  return (
    <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
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
        <Box component="form" noValidate>
          <TextField
            id="username"
            label="Kullanıcı Adı"
            variant="outlined"
            fullWidth
            autoFocus
          />
          <TextField
            id="password"
            label="Şifre"
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
              Beni Hatırla
            </Typography>
          </Box>
          <Button variant="contained" fullWidth>
            Giriş Yap
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
