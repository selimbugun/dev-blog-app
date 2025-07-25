import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { Box, Grid } from "@mui/system";
import Link from "next/link";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { createClient } from "@/lib/supabaseClient";

export default async function Page() {
  try {
    const supabase = createClient;

    const { data, error } = await supabase.from("posts").select("*");
    if (error) {
      return (
        <Alert severity="error">
          Sayfa Yüklenemedi! Lütfen tekrar deneyin.
        </Alert>
      );
    }

    return (
      <Container>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={1}
          sx={{ padding: "10px" }}
        >
          <Grid size={{ xs: 12 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              DevBlog Sosyal
            </Typography>
          </Grid>

          {data.map((post) => {
            if (post.published) {
              return (
                <Grid
                  key={post.id}
                  size={{ xs: 12, md: 4 }}
                  sx={{ padding: "20px" }}
                >
                  <Card
                    sx={{
                      maxWidth: 500,
                      height: "100%",
                      backgroundColor: "#f8fafc",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        height: 250,
                        objectFit: "contain",
                        backgroundColor: "#f8fafc",
                      }}
                      image={post.cover_image}
                      title={post.title}
                    />
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography variant="h5" component="div">
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {post.description}
                      </Typography>
                    </CardContent>

                    <CardActions
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ justifySelf: "end" }}
                      >
                        {new Date(post.created_at).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Typography>
                      <Button
                        variant="text"
                        color="success"
                        component={Link}
                        href={`/blog/${post.slug}`}
                        sx={{ textTransform: "none" }}
                      >
                        Detaylara Göz At &nbsp; <ArrowOutwardIcon />
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            }
          })}
        </Grid>
      </Container>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <Box
        sx={{
          height: "100vh",
        }}
      >
        <Alert severity="error">
          Sayfa Yüklenemedi! Lütfen tekrar deneyin.
        </Alert>
      </Box>
    );
  }
}
