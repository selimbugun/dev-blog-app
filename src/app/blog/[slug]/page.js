import { notFound } from "next/navigation";
import { Alert, Paper } from "@mui/material";

export default async function Page({ params }) {
  const { slug } = await params;

  try {
    const response = await fetch("http://localhost:3000/api/blogs/" + slug);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const post = await response.json();

    if (!post) {
      notFound();
    }

    return (
      <Paper elevation={3} sx={{ padding: "20px", margin: "20px" }}>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <small>{post.date}</small>
      </Paper>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <Alert severity="error">Bir hata oluştu!</Alert>;
  }
}
