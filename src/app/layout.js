"use server";
import Header from "@/components/header";
import "./globals.css";
import Footer from "@/components/footer";
import { Container } from "@mui/material";
import CustomThemeProvider from "@/providers/themeProvider";

export default async function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <CustomThemeProvider>
          <Header />
          <Container>{children}</Container>
          <footer>
            <Footer />
          </footer>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
