"use server";

import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function loginAction(email, password, rememberMe) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error.message);
    return;
  } else {
    // Çerez ekleme
    if (data?.session) {
      const cookieStore = cookies();
      cookieStore.set("sb-access-token", data.session.access_token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 2, // 7 gün veya 2 saat
      });
      cookieStore.set("sb-refresh-token", data.session.refresh_token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 2, // 30 gün veya 2 saat
      });
    }
    return data;
  }
}
