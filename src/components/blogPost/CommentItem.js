"use client";
import { Button, Box, Divider, Typography } from "@mui/material";

export default function CommentItem({ comment, isOwner, onDelete }) {
  return (
    <Box
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
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography variant="caption" color="text.secondary">
            {new Date(comment.created_at).toLocaleString("tr-TR")}
          </Typography>
          {isOwner && (
            <Button
              onClick={() => onDelete(comment.id)}
              size="small"
              color="error"
            >
              Sil
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
