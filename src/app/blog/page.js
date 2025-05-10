import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";
import Link from "next/link";

export default async function Page() {
  try {
    const response = await fetch("http://localhost:3000/api/blogs");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return (
      <Grid container rowSpacing={3} columnSpacing={3} sx={{ padding: "20px" }}>
        {data.map((post) => (
          <Grid key={post.id} size={{ xs: 12, md: 6 }} sx={{ padding: "20px" }}>
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia
                component="img"
                sx={{
                  height: 140,
                  objectFit: "contain",
                }}
                image={post.cover_image}
                title={post.title}
              />
              <CardContent>
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
                  variant="outlined"
                  component={Link}
                  href={`/blog/${post.slug}`}
                >
                  Daha Fazla
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }
}
