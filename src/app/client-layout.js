// app/client-layout.js
"use client";
import Header from "@/components/header";
import "./globals.css";
import Footer from "@/components/footer";
import CustomThemeProvider from "@/providers/themeProvider";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [hideNavbar, setHideNavbar] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const hideNavbarPaths = ["/login", "/register"];

    if (hideNavbarPaths.includes(pathname)) {
      setHideNavbar(true);
      setIsReady(true);
      return;
    }

    // Hemen kontrol et
    const checkFor404 = () => {
      if (containerRef.current) {
        const containerText = containerRef.current.textContent || "";
        const bodyText = document.body.textContent || "";
        const is404 =
          containerText.includes("This page could not be found") ||
          containerText.includes("404") ||
          bodyText.includes("This page could not be found") ||
          document.title.includes("404");

        setHideNavbar(is404);
        setIsReady(true);
      }
    };

    // İlk kontrol
    checkFor404();

    // Kısa bir süre sonra tekrar kontrol
    const timer = setTimeout(checkFor404, 50);

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <CustomThemeProvider>
      <div
        style={{
          opacity: isReady ? 1 : 0,
          transition: "opacity 0.1s ease-in-out",
        }}
      >
        {!hideNavbar && <Header />}
        <div ref={containerRef}>{children}</div>
        {!hideNavbar && (
          <footer>
            <Footer />
          </footer>
        )}
      </div>
    </CustomThemeProvider>
  );
}
