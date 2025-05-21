import { createClient } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const accessTokenMaxAge = 60 * 60 * 24 * 7;
  const refreshTokenMaxAge = 60 * 60 * 24 * 30;

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
    maxAge: accessTokenMaxAge,
  });

  res.cookies.set("sb-refresh-token", refresh_token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: refreshTokenMaxAge,
  });

  return res;
}
