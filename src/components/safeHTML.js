// components/SafeHTML.js
"use client";

import { useEffect, useRef } from "react";
import DOMPurify from "dompurify";

export default function SafeHTML({ html, className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const clean = DOMPurify.sanitize(html, {
        ADD_ATTR: ["loading", "decoding"], // Allow lazy loading and decoding attributes
        ADD_TAGS: ["style"], // Allow style tags if needed
      });

      containerRef.current.innerHTML = clean;

      // Optimize all images within the container
      const images = containerRef.current.querySelectorAll("img");
      images.forEach((img) => {
        // Add lazy loading
        img.loading = "lazy";
        // Add decoding async for better performance
        img.decoding = "async";
        // Add empty alt text if not present
        if (!img.alt) img.alt = "";
        // Apply width: 100% style
        img.style.width = "100%";
        // Add height auto to maintain aspect ratio
        img.style.height = "auto";
        // Add max-width to prevent over-scaling
        img.style.maxWidth = "100%";
      });
    }
  }, [html]);

  return <div ref={containerRef} className={className} />;
}
