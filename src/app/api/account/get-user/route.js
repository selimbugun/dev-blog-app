import { createClientWithToken } from "@/lib/supabaseWithToken";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sb-access-token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const supabase = createClientWithToken(token);
  const { data: user, error } = await supabase.auth.getUser();

  if (error) {
    const response = NextResponse.json({ user: null }, { status: 401 });
    response.cookies.delete("sb-access-token");
    response.cookies.delete("sb-refresh-token");
    return response;
  }

  return NextResponse.json({ user });
}
