"use client";
import TipTap from "@/components/tiptap/TextEditor";
import GetUserClient from "@/utils/getUserClient";
import { uploadImage } from "@/utils/uploadImage";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const user = GetUserClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [state, setState] = useState({
    content: "",
    selectedImage: null,
    saveButtonClicked: false,
  });

  const onSubmit = async (data) => {
    let url = null;
    if (state.selectedImage) {
      url = await uploadImage(state.selectedImage);
    }

    const formData = {
      ...data,
      content: state.content,
      cover_image: url,
      author_id: user.id,
    };

    try {
      const response = await fetch(`/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        window.location.href = `/blog/${result.post.slug}`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setState((prev) => ({
        ...prev,
        selectedImage: e.target.files[0],
      }));
      setValue("cover_image", e.target.files[0]); // React Hook Form'a da ekle
    }
  };

  const handleSave = (editorContent) => {
    setState((prev) => ({ ...prev, content: editorContent }));
    setValue("content", editorContent, { shouldValidate: true });
    setState((prev) => ({ ...prev, saveButtonClicked: true }));
    console.log("gelen içerik: ", editorContent);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Yeni Yazı Oluştur
      </Typography>
      <Box
        component="form"
        sx={{ my: 2 }}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ my: 2 }}>
          <TextField
            {...register("title", {
              required: true,
              minLength: {
                value: 10,
                message: "Minimum 10 karakter olmalıdır",
              },
              maxLength: {
                value: 50,
                message: "Maksimum 50 karakter olmalıdır",
              },
            })}
            label="Yazı Başlığı"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: "white" }}
            error={errors.title ? true : false}
            helperText={errors.title?.message}
          />
        </Box>
        <Box sx={{ my: 2 }}>
          <TextField
            {...register("description", {
              required: true,
              minLength: {
                value: 30,
                message: "Minimum 30 karakter olmalıdır",
              },
              maxLength: {
                value: 200,
                message: "Maksimum 200 karakter olmalıdır",
              },
            })}
            label="Yazı Kısa Özeti"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: "white" }}
            error={errors.description ? true : false}
            helperText={errors.description?.message}
          />
        </Box>
        <>
          <Button
            variant="contained"
            color="success"
            component="label"
            sx={{ mt: 2 }}
          >
            Yazının Avatar Görselini Seç
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                handleImageChange(e); // State'i güncelle
                register("image").onChange(e); // React Hook Form'a kaydet
              }}
            />
          </Button>
          {state.selectedImage && (
            <Box sx={{ my: 2 }}>
              <Typography variant="body2">
                {state.selectedImage.name}
              </Typography>
              <Image
                src={URL.createObjectURL(state.selectedImage)}
                alt="Seçilen Görsel"
                width={250}
                height={200}
                style={{ marginTop: 8 }}
              />
            </Box>
          )}
        </>
        <TipTap onSave={handleSave} />
        {state.saveButtonClicked ? (
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ my: 2 }}
            disabled={isSubmitting}
          >
            Paylaş
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ my: 2 }}
            disabled
          >
            Lütfen önce kaydedin!
          </Button>
        )}
      </Box>
    </Container>
  );
}
