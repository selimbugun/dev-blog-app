// app/layout.js (Server Component)
import ClientLayout from "./client-layout";

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
