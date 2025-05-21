"use client";

import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "@/theme/theme";

export default function CustomThemeProvider({ children }) {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
}
