// app/not-found.js
"use client";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .__next-error-h1 {
        display: inline-block;
        margin: 0 20px 0 0;
        padding: 0 23px 0 0;
        font-size: 24px;
        font-weight: 500;
        vertical-align: top;
        line-height: 49px;
        border-right: 1px solid #fff;
      }
      
      .__next-error-h2 {
        font-size: 14px;
        font-weight: normal;
        line-height: 49px;
        margin: 0;
      }
      
      .__next-error {
        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
        height: 100vh;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;
        background: #000;
      }
      
      @media (max-width: 768px) {
        .__next-error-h1 {
          border-right: 0;
          padding: 0;
          margin-bottom: 10px;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="__next-error">
      <div>
        <h1 className="__next-error-h1">404</h1>
        <div style={{ display: "inline-block" }}>
          <h2 className="__next-error-h2">This page could not be found.</h2>
        </div>
      </div>
    </div>
  );
}
