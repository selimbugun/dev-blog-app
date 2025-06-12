"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Alert,
  Skeleton,
  CardActions,
  Button,
} from "@mui/material";

export default function MyPostsTab() {
  const [state, setState] = useState({
    postList: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs/getblogbyuser`
        );

        if (!response.ok) {
          throw new Error("Veri alınamadı");
        }

        const data = await response.json();
        setState({ postList: data, loading: false, error: null });
      } catch (error) {
        setState({ postList: [], loading: false, error: error.message });
      }
    };

    fetchData();
  }, []);

  const { postList, loading, error } = state;

  if (loading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 3 }).map((_, idx) => (
          <Grid item xs={12} md={6} lg={4} key={idx}>
            <Skeleton variant="rectangular" height={200} />
            <Skeleton width="80%" />
            <Skeleton width="60%" />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (postList.length === 0) {
    return <Typography>Henüz bir yazınız yok.</Typography>;
  }

  return (
    <Grid container spacing={3}>
      {postList.map((post) => (
        <Grid item size={{ xs: 12, md: 6 }} key={post.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                {post.title}
              </Typography>

              <Typography
                variant="caption"
                display="block"
                sx={{ marginTop: 1, color: "gray" }}
              >
                {new Date(post.created_at).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                sx={{ m: 1, textTransform: "none" }}
                size="small"
                variant="contained"
                href={`/blog/${post.slug}`}
              >
                Yazıya Git
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
