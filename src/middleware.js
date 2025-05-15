// middleware.js
import { createMiddlewareClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({
    req,
    res,
  });

  // Session kontrolü
  await supabase.auth.getSession();

  return res;
}

export const config = {
  matcher: ["/dashboard", "/profile", "/admin/:path*"], // korumalı yollar
};
