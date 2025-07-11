import { createClient } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req) {
  const supabase = createClient;

  // Supabase oturumunu sonlandır
  await supabase.auth.signOut();

  // Çerezleri sil
  const res = NextResponse.json({ message: "Logged out" }, { status: 200 });
  res.cookies.set("sb-access-token", "", { maxAge: 0, path: "/" });
  res.cookies.set("sb-refresh-token", "", { maxAge: 0, path: "/" });

  return res;
}
