import { Container, Paper, Typography } from "@mui/material";

export default function AccountLayout({ title, children }) {
  return (
    <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
      <Typography
        sx={{ my: 2 }}
        gutterBottom
        component="h1"
        variant="h4"
        align="center"
      >
        {title}
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        {children}
      </Paper>
    </Container>
  );
}
