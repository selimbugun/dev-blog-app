"use client";
import CommentItem from "./CommentItem";
import { Typography } from "@mui/material";

export default function CommentList({ comments, currentUserId, onDelete }) {
  if (comments.length === 0) {
    return (
      <Typography align="center" color="text.secondary">
        Henüz yorum yok.
      </Typography>
    );
  }

  return comments.map((comment) => (
    <CommentItem
      key={comment.id}
      comment={comment}
      isOwner={comment.user_id === currentUserId}
      onDelete={onDelete}
    />
  ));
}
