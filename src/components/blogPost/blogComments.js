"use client";
import { Container, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import GetUserClient from "@/utils/getUserClient";

export default function BlogComments({ id }) {
  const user = GetUserClient();

  const [state, setState] = useState({
    comments: [],
    loading: true,
    error: "",
    content: "",
    submitting: false,
  });

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/blogs/comments?postId=${id}`);
      const data = await response.json();
      setState((prev) => ({
        ...prev,
        comments: data,
        loading: false,
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        error: "Yorumlar yüklenemedi.",
        loading: false,
      }));
    }
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.content.trim()) return;
    setState((prev) => ({ ...prev, submitting: true, error: "" }));

    try {
      const response = await fetch(`/api/blogs/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: id, content: state.content }),
      });

      const newComment = await response.json();
      setState((prev) => ({
        ...prev,
        comments: [newComment, ...prev.comments],
        content: "",
        submitting: false,
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        error: "Yorum gönderilemedi.",
        submitting: false,
      }));
    }
  };

  const handleDelete = async (commentId) => {
    if (!confirm("Bu yorumu silmek istediğinizden emin misiniz?")) return;

    try {
      await fetch(`/api/blogs/comments?id=${commentId}`, { method: "DELETE" });
      setState((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c.id !== commentId),
      }));
    } catch {
      alert("Yorum silinemedi.");
    }
  };

  return (
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
        {state.loading ? (
          <Typography align="center" color="text.secondary">
            Yükleniyor...
          </Typography>
        ) : state.error ? (
          <Typography color="error" align="center">
            {state.error}
          </Typography>
        ) : (
          <CommentList
            comments={state.comments}
            currentUserId={user?.id}
            onDelete={handleDelete}
          />
        )}
      </Container>

      <CommentForm
        content={state.content}
        onChange={(e) =>
          setState((prev) => ({ ...prev, content: e.target.value }))
        }
        onSubmit={handleSubmit}
        submitting={state.submitting}
        user={user}
      />
    </Paper>
  );
}
