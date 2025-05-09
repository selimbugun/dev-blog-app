import Header from "@/components/header";
import "./globals.css";
import Footer from "@/components/footer";
import { Container } from "@mui/material";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Container sx={{ mt: 10, mb: 20 }}>{children}</Container>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
