import { Grid, IconButton, Stack, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Grid
      container
      spacing={2}
      direction="row"
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <Grid
        size="grow"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack spacing={2}>
          <Typography variant="body2">Privacy Policy</Typography>
          <Typography variant="body2">Terms & Conditions</Typography>
          <Typography variant="body2">Cookie Policy</Typography>
        </Stack>
      </Grid>
      <Grid
        size={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2">2025 © DevBlog </Typography>
      </Grid>
      <Grid
        size="grow"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack spacing={2} direction="row">
          <IconButton>
            <FacebookIcon />
          </IconButton>
          <IconButton>
            <InstagramIcon />
          </IconButton>
          <IconButton>
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  );
}
