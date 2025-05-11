import Header from "@/components/header";
import "./globals.css";
import Footer from "@/components/footer";
import { Container } from "@mui/material";

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Header />
        <Container>{children}</Container>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
