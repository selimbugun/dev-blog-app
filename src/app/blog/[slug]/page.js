import { notFound } from "next/navigation";
import { Alert, Paper, Typography } from "@mui/material";
import Image from "next/image";

export default async function Page({ params }) {
  const { slug } = await params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URl}/api/blogs/${slug}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const post = await response.json();

    if (!post) {
      notFound();
    }
    console.log(post);

    return (
      <Paper elevation={3} sx={{ padding: "20px", margin: "20px" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {post.title}
        </Typography>
        <Image
          priority
          src={"/images/" + post.cover_image}
          alt={post.title}
          width={1000}
          height={400}
          sx={{ objectFit: "contain" }}
        />
        <Typography variant="h5" gutterBottom>
          {post.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {post.content}
        </Typography>
        <small>{new Date(post.created_at).toLocaleString()}</small>
        <small></small>
      </Paper>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <Alert severity="error">Bir hata oluştu!</Alert>;
  }
}
