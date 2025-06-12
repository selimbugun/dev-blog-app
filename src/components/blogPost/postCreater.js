import { Container, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";

export default function PostCreater({ user }) {
  return (
    <Container maxWidth="xs" sx={{ ml: 0 }}>
      <Paper>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid>
            <Image
              priority
              src={user.avatar_url ? user.avatar_url : "/images/no-image.png"}
              alt={user.username}
              width={200}
              height={200}
            />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Yazar: {user.username}</Typography>
            <Typography variant="body2">email</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
