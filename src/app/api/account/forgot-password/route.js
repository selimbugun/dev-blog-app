import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";

export async function POST(req) {
  const { email } = await req.json();
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/account/reset-password?next=/account/update-password`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
