import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";
import Link from "next/link";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import "react-quill/dist/quill.snow.css";

export default async function Page() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URl}/api/blogs`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return (
      <Grid container rowSpacing={1} columnSpacing={1} sx={{ padding: "10px" }}>
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
                    image={"images/" + post.cover_image}
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
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <Alert severity="error">Sayfa Yüklenemedi! Lütfen tekrar deneyin.</Alert>
    );
  }
}
