import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import TipTap from "../tiptap/TextEditor";

export default async function BlogComments({ id }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs/comments?postId=${id}`
    );
    if (!response.ok) {
      throw new Error("Veri alınamadı");
    }
    const data = await response.json();
    console.log(data);

    return (
      <>
        <Paper
          elevation={3}
          sx={{
            padding: { xs: "15px", md: "30px" },
            margin: { xs: "10px", md: "20px" },
            borderRadius: "12px",
            backgroundColor: "#fafafa",
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
            Yorumlar
          </Typography>

          <Container maxWidth="md">
            {data.length === 0 ? (
              <Typography align="center" color="text.secondary">
                Henüz yorum yok.
              </Typography>
            ) : (
              data.map((comment) => (
                <Box
                  key={comment.id}
                  sx={{
                    mb: 3,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "#fff",
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {comment.content}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      {comment.user?.username || "Anonim"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(comment.created_at).toLocaleString("tr-TR")}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </Container>
          <Box>
            <TextField
              fullWidth
              label="Yorum"
              multiline
              rows={4}
              sx={{ mt: 2 }}
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Yorum Yap
            </Button>
          </Box>
        </Paper>
      </>
    );
  } catch (error) {
    console.error("Veri alınamadı:", error);
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        Yorumlar yüklenemedi.
      </Typography>
    );
  }
}
