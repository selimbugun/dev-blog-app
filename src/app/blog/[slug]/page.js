import { notFound } from "next/navigation";
import { Alert, Box, Paper, Typography, Divider, Chip } from "@mui/material";
import Image from "next/image";
import SafeHTML from "@/components/safeHTML";
import BlogComments from "@/components/blogPost/blogComments";

export default async function Page({ params }) {
  const { slug } = await params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs/${slug}`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const post = await response.json();

    if (!post) {
      notFound();
    }
    return (
      <>
        <Paper
          elevation={3}
          sx={{
            padding: { xs: "15px", md: "30px" },
            margin: { xs: "10px", md: "20px" },
            borderRadius: "12px",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,

              fontSize: { xs: "1.8rem", md: "2.5rem" },
            }}
          >
            {post.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 3,
              flexWrap: "wrap",
            }}
          >
            {post.users_extra.username && (
              <Chip
                label={`By ${post.users_extra.username}`}
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            )}

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic" }}
            >
              Published on {new Date(post.created_at).toLocaleString()}
            </Typography>
          </Box>

          <Image
            priority
            src={post.cover_image ? post.cover_image : "/images/no-image.png"}
            alt={post.title}
            width={1000}
            height={400}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          />

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 500,
              color: "text.secondary",
              mb: 4,
            }}
          >
            {post.description}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              "& img": { maxWidth: "100%", height: "auto" },
              "& p": { lineHeight: 1.6, mb: 2 },
              "& h2": { mt: 4, mb: 2 },
              "& ul, & ol": { pl: 3, mb: 2 },
            }}
          >
            <SafeHTML html={post.content} />
          </Box>
        </Paper>
        <BlogComments id={post.id} />
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <Alert severity="error">Bir hata oluştu!</Alert>;
  }
}
