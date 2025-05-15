import { NextResponse } from "next/server";
import supabase from "@/lib/supabaseClient";

export async function POST(req) {
  const { email, password } = await req.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  const { access_token, refresh_token } = data.session;

  const res = NextResponse.json({ user: data.user }, { status: 200 });

  res.cookies.set("sb-access-token", access_token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 gün
  });

  res.cookies.set("sb-refresh-token", refresh_token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 gün
  });

  return res;
}
