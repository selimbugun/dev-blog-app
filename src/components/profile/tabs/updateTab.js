"use client";
import AccountAlert from "@/components/account/accountAlert";
import formatDateForInput from "@/utils/formatDateForInput";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

export default function UpdateTab({ data }) {
  const [state, setState] = useState({
    error: "",
    token: "",
    fullname: data.fullname,
    username: data.username,
    date_of_birth: formatDateForInput(data.date_of_birth),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getToken = () => {
      fetch("http://localhost:3000/api/account/token")
        .then((res) => res.json())
        .then((data) => setState((prev) => ({ ...prev, token: data.token })))
        .catch((error) => console.log(error));
    };
    getToken();
  }, []);

  const onSubmit = async (formData) => {
    setState((prev) => ({ ...prev, error: "" }));
    try {
      const payload = {
        id: data.id,
        fullname: formData.fullname,
        username: formData.username,
        date_of_birth: formData.date_of_birth,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/account/users_extra`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (result.error) {
        if (result.error.code === "23505") {
          setState((prev) => ({
            ...prev,
            error: "Bu kullanıcı adı zaten alınmış",
          }));
          return;
        }
        setState((prev) => ({ ...prev, error: result.error.message }));
        return;
      }

      window.location.reload();
      return result.data;
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
            value={state.fullname || ""}
            onChange={(e) =>
              setState((prev) => ({ ...prev, fullname: e.target.value }))
            }
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
            value={state.username || ""}
            onChange={(e) =>
              setState((prev) => ({ ...prev, username: e.target.value }))
            }
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
            value={state.date_of_birth || ""}
            onChange={(e) =>
              setState((prev) => ({ ...prev, date_of_birth: e.target.value }))
            }
          />
        </Grid>
        {state.error && (
          <Grid>
            <AccountAlert type="error" message={state.error} />
          </Grid>
        )}
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
