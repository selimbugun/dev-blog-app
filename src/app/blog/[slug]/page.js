import { notFound } from "next/navigation";
import { Alert, Paper, Typography } from "@mui/material";
import Image from "next/image";
import SafeHTML from "@/components/safeHTML";

export default async function Page({ params }) {
  const { slug } = await params;
  console.log(params);

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
          src={post.cover_image}
          alt={post.title}
          width={1000}
          height={400}
          style={{ width: "100%", height: "auto", objectFit: "contain" }}
        />
        <Typography variant="h5" gutterBottom>
          {post.description}
        </Typography>
        <SafeHTML html={post.content} />
        <small>{new Date(post.created_at).toLocaleString()}</small>
        <small></small>
      </Paper>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <Alert severity="error">Bir hata oluştu!</Alert>;
  }
}
