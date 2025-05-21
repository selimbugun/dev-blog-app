"use client";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

export default function UpdateTab({ data, user }) {
  const [token, setToken] = useState("");
  const [fullname, setFullname] = useState(data.fullname);
  const [username, setUsername] = useState(data.username);
  const [date_of_birth, setDateOfBirth] = useState(
    formatDateForInput(data.date_of_birth)
  );

  function formatDateForInput(dateString) {
    const date = new Date(dateString);
    const timezoneOffset = date.getTimezoneOffset(); // Dakika cinsinden
    date.setMinutes(date.getMinutes() - timezoneOffset); // UTC'den local'e çevir
    return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getToken = () => {
      fetch("http://localhost:3000/api/account/token")
        .then((res) => res.json())
        .then((data) => setToken(data.token))
        .catch((error) => console.log(error));
    };
    getToken();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const payload = {
        id: data.id,
        fullname: formData.fullname,
        username: formData.username,
        date_of_birth: formData.date_of_birth,
      };
      const response = await fetch(
        "http://localhost:3000/api/account/users_extra",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (result.success) {
        window.location.reload();
        return result.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 3 }}>
          <Typography variant="body1">Ad Soyad: </Typography>
        </Grid>
        <Grid size={{ xs: 9 }}>
          <TextField
            {...register("fullname")}
            size="small"
            variant="outlined"
            value={fullname || ""}
            onChange={(e) => setFullname(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Typography variant="body1">Kullanıcı Adı: </Typography>
        </Grid>
        <Grid size={{ xs: 9 }}>
          <TextField
            {...register("username")}
            size="small"
            variant="outlined"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 3 }}>
          <Typography variant="body1">Doğum Tarihi: </Typography>
        </Grid>
        <Grid size={{ xs: 9 }}>
          <TextField
            {...register("date_of_birth")}
            type="date"
            size="small"
            value={date_of_birth || ""}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </Grid>
        <Button
          variant="contained"
          type="submit"
          sx={{ textTransform: "none" }}
        >
          <Typography variant="body1">Bilgilerimi Güncelle</Typography>
        </Button>
        {errors && (
          <Typography variant="body1" color="error">
            {errors.message}
          </Typography>
        )}
      </Grid>
    </Box>
  );
}
