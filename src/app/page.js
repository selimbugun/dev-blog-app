import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Code, Visibility, Speed } from "@mui/icons-material";
import CodeIcon from "@mui/icons-material/Code";

export default function Home() {
  return (
    <Box>
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            fontWeight="bold"
            fontFamily="monospace"
            letterSpacing=".3rem"
            gutterBottom
          >
            <CodeIcon fontSize="large" /> DevBlog
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Geliştiriciler için sade, hızlı ve modern bir blog platformu.
          </Typography>
          <Button variant="contained" size="large" sx={{ mt: 3 }} href="/blog">
            Bloglara Göz At
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 10 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Neler Sunuyoruz?
        </Typography>
        <Grid container spacing={4} mt={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={3} sx={{ height: "100%" }}>
              <CardContent>
                <Code fontSize="large" color="primary" />
                <Typography variant="h6" mt={2}>
                  Modern Teknolojiler
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Next.js ve Supabase gibi modern teknolojilerle inşa edildi.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={3} sx={{ height: "100%" }}>
              <CardContent>
                <Visibility fontSize="large" color="primary" />
                <Typography variant="h6" mt={2}>
                  Şeffaf ve Temiz UI
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kullanıcı dostu tasarımı ile içerik odaklı deneyim sunar.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={3} sx={{ height: "100%" }}>
              <CardContent>
                <Speed fontSize="large" color="primary" />
                <Typography variant="h6" mt={2}>
                  Hızlı Performans
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Server Side Rendering (SSR) ile SEO dostu yapı.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
