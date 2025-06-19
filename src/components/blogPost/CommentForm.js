"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";

export default function CommentForm({
  content,
  onChange,
  onSubmit,
  submitting,
  user,
}) {
  return (
    <Box component="form" onSubmit={onSubmit}>
      <TextField
        fullWidth
        label="Yorum"
        multiline
        rows={4}
        sx={{ mt: 2 }}
        value={content}
        onChange={onChange}
        disabled={submitting || !user}
      />
      {user ? (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          type="submit"
          disabled={submitting || !content.trim()}
        >
          {submitting ? "Gönderiliyor..." : "Yorum Yap"}
        </Button>
      ) : (
        <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
          Yorum yapabilmek için{" "}
          <Link href="/login">
            <span style={{ color: "#1976d2" }}>giriş</span>
          </Link>{" "}
          yapmalısınız.
        </Typography>
      )}
    </Box>
  );
}
