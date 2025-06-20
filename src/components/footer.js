import { Grid, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Grid
      container
      sx={{ borderTop: "2px solid #333333", py: 2 }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid>
        <Typography variant="body1" align="center">
          &copy; {new Date().getFullYear()} DevBlog Sosyal
        </Typography>
      </Grid>
    </Grid>
  );
}
