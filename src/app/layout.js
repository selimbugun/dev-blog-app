import "./globals.css";
import { Container } from "@mui/material";
import { Providers } from "./store/providers";
import App from "@/components/appWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Providers>
          <App>
            <Container>{children}</Container>
          </App>
        </Providers>
      </body>
    </html>
  );
}
