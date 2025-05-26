import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#90caf9",
    },
    dBlue: {
      main: "#185886",
    },
    lBlue: {
      main: "#D9EAFD",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {},
      },
    },
  },
});
